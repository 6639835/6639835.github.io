// Service Worker for Portfolio Website
// Version 1.0.0

const CACHE_NAME = 'portfolio-v1.0.0';
const STATIC_CACHE_URLS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/404.html',
    '/favicon.ico',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
];

// Install Event - Cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache opened');
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .then(() => {
                console.log('All static assets cached');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Cache installation failed:', error);
            })
    );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch Event - Serve from cache with network fallback
self.addEventListener('fetch', (event) => {
    // Skip non-HTTP requests
    if (!event.request.url.startsWith('http')) {
        return;
    }
    
    // Skip POST requests and other non-GET methods
    if (event.request.method !== 'GET') {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    return cachedResponse;
                }
                
                // Otherwise fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone the response since it can only be consumed once
                        const responseToCache = response.clone();
                        
                        // Cache successful responses for future use
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                // Only cache same-origin requests and specific external resources
                                if (event.request.url.startsWith(self.location.origin) ||
                                    event.request.url.includes('cdnjs.cloudflare.com') ||
                                    event.request.url.includes('fonts.googleapis.com') ||
                                    event.request.url.includes('fonts.gstatic.com')) {
                                    cache.put(event.request, responseToCache);
                                }
                            });
                        
                        return response;
                    })
                    .catch((error) => {
                        console.error('Fetch failed:', error);
                        
                        // Return offline page for navigation requests
                        if (event.request.mode === 'navigate') {
                            return caches.match('/404.html');
                        }
                        
                        throw error;
                    });
            })
    );
});

// Background Sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(
            // Process any pending form submissions
            processQueuedFormSubmissions()
        );
    }
});

// Handle queued form submissions
async function processQueuedFormSubmissions() {
    try {
        const cache = await caches.open('form-submissions');
        const requests = await cache.keys();
        
        for (const request of requests) {
            try {
                await fetch(request);
                await cache.delete(request);
                console.log('Form submission processed');
            } catch (error) {
                console.error('Failed to process form submission:', error);
            }
        }
    } catch (error) {
        console.error('Error processing queued submissions:', error);
    }
}

// Push notification handling (for future use)
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            data: data.data || {},
            requireInteraction: true
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow(event.notification.data.url || '/')
    );
});

// Error handling
self.addEventListener('error', (event) => {
    console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('Service Worker unhandled rejection:', event.reason);
});

console.log('Service Worker script loaded');
