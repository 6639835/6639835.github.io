// Service Worker for Portfolio Website
// Version 1.0.0

const CACHE_VERSION = 'v1.1.0';
const STATIC_CACHE_NAME = `portfolio-static-${CACHE_VERSION}`;
const RUNTIME_CACHE_NAME = `portfolio-runtime-${CACHE_VERSION}`;
const STATIC_CACHE_URLS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/404.html',
    '/favicon.ico'
];

const EXTERNAL_CACHE_URLS = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
];

// Install Event - Cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then((cache) => {
                console.log('Cache opened');
                return cache.addAll(STATIC_CACHE_URLS).then(() => cache);
            })
            .then((cache) => {
                const externalRequests = EXTERNAL_CACHE_URLS.map((url) => (
                    cache.add(new Request(url, { mode: 'no-cors' }))
                ));
                return Promise.allSettled(externalRequests);
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
                        if (cacheName !== STATIC_CACHE_NAME && cacheName !== RUNTIME_CACHE_NAME) {
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
    
    const request = event.request;
    const url = new URL(request.url);
    const isHTMLRequest = request.mode === 'navigate' ||
        (request.headers.get('accept') || '').includes('text/html');
    const isSameOrigin = url.origin === self.location.origin;
    
    event.respondWith(isHTMLRequest ? networkFirst(request) : cacheFirst(request, isSameOrigin));
});

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        const cache = await caches.open(RUNTIME_CACHE_NAME);
        cache.put(request, response.clone());
        return response;
    } catch (error) {
        const cached = await caches.match(request);
        if (cached) return cached;
        return caches.match('/404.html');
    }
}

async function cacheFirst(request, isSameOrigin) {
    const cached = await caches.match(request);
    if (cached) return cached;
    
    try {
        const response = await fetch(request);
        if (response && response.status === 200) {
            const cache = await caches.open(RUNTIME_CACHE_NAME);
            if (shouldCacheRequest(request, isSameOrigin)) {
                cache.put(request, response.clone());
            }
        }
        return response;
    } catch (error) {
        return cached;
    }
}

function shouldCacheRequest(request, isSameOrigin) {
    return isSameOrigin ||
        request.url.includes('cdnjs.cloudflare.com') ||
        request.url.includes('fonts.googleapis.com') ||
        request.url.includes('fonts.gstatic.com') ||
        request.url.includes('cdn.jsdelivr.net');
}

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
