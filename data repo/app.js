// NZTC Data Discovery Platform - Production Ready Application

// Configuration and Data
const PLATFORM_CONFIG = {
    apiBaseUrl: 'https://api.nztc.com/v1',
    itemsPerPage: 20,
    maxApiCalls: {
        free: 1000,
        professional: 10000,
        enterprise: 'unlimited'
    }
};

// Application Data
const APPLICATION_DATA = {
    subscriptionTiers: [
        {
            id: "free", 
            name: "Free", 
            apiCalls: 1000, 
            sources: "Basic", 
            support: "Community",
            price: "£0",
            features: ["1,000 API calls/month", "Basic data sources", "Community support", "Standard documentation"]
        },
        {
            id: "professional", 
            name: "Professional", 
            apiCalls: 10000, 
            sources: "Premium", 
            support: "Email", 
            price: "£99/month",
            features: ["10,000 API calls/month", "Premium data sources", "Email support", "Advanced analytics"],
            featured: true
        },
        {
            id: "enterprise", 
            name: "Enterprise", 
            apiCalls: "Unlimited", 
            sources: "All", 
            support: "Dedicated", 
            price: "Contact us",
            features: ["Unlimited API calls", "All data sources", "Dedicated support", "Custom integrations"]
        }
    ],
    departments: [
        {id: "alt-fuels", name: "Alt Fuels", color: "#FF6B35", icon: "fas fa-gas-pump", sources: 2},
        {id: "ccus", name: "CCUS", color: "#4ECDC4", icon: "fas fa-industry", sources: 3},
        {id: "digital", name: "Digital", color: "#45B7D1", icon: "fas fa-microchip", sources: 4},
        {id: "electricity-tds", name: "Electricity TD&S", color: "#96CEB4", icon: "fas fa-bolt", sources: 3},
        {id: "emissions", name: "Emissions Reduction", color: "#FFEAA7", icon: "fas fa-leaf", sources: 2},
        {id: "fow", name: "FOW", color: "#74B9FF", icon: "fas fa-wind", sources: 3},
        {id: "hydrogen", name: "Hydrogen", color: "#A29BFE", icon: "fas fa-atom", sources: 2},
        {id: "industrial-decarb", name: "Industrial Decarbonisation", color: "#FD79A8", icon: "fas fa-factory", sources: 2},
        {id: "maintenance-decomm", name: "Maintenance & Decomm", color: "#FDCB6E", icon: "fas fa-tools", sources: 3},
        {id: "ops", name: "Ops", color: "#6C5CE7", icon: "fas fa-cogs", sources: 3},
        {id: "production", name: "Production", color: "#00B894", icon: "fas fa-chart-line", sources: 4},
        {id: "renewables", name: "Renewables", color: "#00CEC9", icon: "fas fa-solar-panel", sources: 5},
        {id: "wild-card", name: "Wild Card", color: "#E17055", icon: "fas fa-lightbulb", sources: 2}
    ],
    platformStats: {
        totalSources: 23,
        liveSources: 3,
        departments: 13,
        apiCalls: "2.5M+",
        users: "850+",
        organizations: "120+"
    },
    recentActivity: [
        {action: "API Access", source: "NESO Wind Data", time: "2 minutes ago", user: "Sarah Chen", icon: "fas fa-code"},
        {action: "Data Export", source: "CCUS Pipeline", time: "15 minutes ago", user: "Mike Thompson", icon: "fas fa-download"},
        {action: "New Integration", source: "Hydrogen Roadmap", time: "1 hour ago", user: "Alex Rodriguez", icon: "fas fa-plug"},
        {action: "Quality Report", source: "Marine Weather", time: "2 hours ago", user: "Emma Wilson", icon: "fas fa-chart-bar"},
        {action: "API Key Created", source: "Dashboard", time: "3 hours ago", user: "Sarah Chen", icon: "fas fa-key"}
    ]
};

// Featured Data Sources
const FEATURED_SOURCES = [
    {
        id: "neso-wind-solar",
        name: "NESO Embedded Wind & Solar Forecast",
        provider: "National Energy System Operator",
        description: "Real-time embedded wind & solar generation forecasts for Great Britain, updated every 30 minutes with 5-minute resolution data",
        departments: ["renewables", "production", "electricity-tds"],
        dataType: "Wind, Solar, Grid",
        format: ["API", "CSV", "Real-time"],
        accessType: "open",
        quality: "high",
        freshness: "realtime",
        popularity: 98,
        url: "https://www.neso.energy/data-portal/embedded-wind-and-solar-forecasts",
        apiAvailable: true,
        isLive: true,
        lastUpdated: new Date().toISOString(),
        sampleFields: "DATE_GMT, TIME_GMT, EMBEDDED_WIND_FORECAST, EMBEDDED_SOLAR_FORECAST, WIND_CAPACITY, SOLAR_CAPACITY",
        updateFrequency: "Every 30 minutes",
        dataSize: "~600 records per day",
        tags: ["Real-time", "API", "Grid Data", "Forecasting"]
    },
    {
        id: "ccsa-pipeline",
        name: "UK CCUS Project Pipeline",
        provider: "Carbon Capture & Storage Association",
        description: "Complete CO2 capture project database with capacity and timeline data",
        departments: ["ccus", "industrial-decarb"],
        quality: "high",
        freshness: "monthly",
        popularity: 87,
        apiCalls: 45000,
        isLive: false,
        accessType: "Open",
        sampleData: "40+ projects, 25Mt CO2/year capacity",
        tags: ["Projects", "Database", "Industrial"],
        lastUpdated: "2024-12-01"
    },
    {
        id: "hydrogen-roadmap",
        name: "UK Hydrogen Production Roadmap",
        provider: "UK Government DESNZ",
        description: "10GW hydrogen production pathway with detailed project allocation",
        departments: ["hydrogen"],
        quality: "high",
        freshness: "quarterly",
        popularity: 92,
        apiCalls: 67000,
        isLive: false,
        accessType: "Open",
        sampleData: "10GW by 2030 target, project pipeline",
        tags: ["Strategy", "Government", "Production"],
        lastUpdated: "2024-12-16"
    }
];

// Complete Data Sources
const DATA_SOURCES = [
    ...FEATURED_SOURCES,
    {
        id: "pv-live-solar",
        name: "PV_Live UK Solar Generation",
        provider: "University of Sheffield Solar",
        description: "Live national solar PV generation for Great Britain updated every 5 minutes",
        departments: ["renewables", "production"],
        quality: "high",
        freshness: "realtime",
        popularity: 85,
        apiCalls: 89000,
        isLive: true,
        accessType: "Open",
        sampleData: "Solar Generation: 2,150 MW",
        tags: ["Real-time", "Solar", "Generation"],
        lastUpdated: new Date().toISOString()
    },
    {
        id: "marine-weather",
        name: "Open-Meteo Marine Weather",
        provider: "Open-Meteo",
        description: "Live wave height and wind speed data for offshore energy applications",
        departments: ["renewables", "fow", "ops"],
        quality: "medium",
        freshness: "realtime",
        popularity: 72,
        apiCalls: 34000,
        isLive: true,
        accessType: "Open",
        sampleData: "Wave Height: 2.1m, Wind: 8.5m/s",
        tags: ["Marine", "Weather", "Offshore"],
        lastUpdated: new Date().toISOString()
    },
    {
        id: "ukwed",
        name: "UK Wind Energy Database",
        provider: "RenewableUK",
        description: "Comprehensive database of operational wind projects ≥100kW capacity",
        departments: ["renewables", "production"],
        quality: "high",
        freshness: "monthly",
        popularity: 89,
        apiCalls: 78000,
        isLive: false,
        accessType: "Open",
        sampleData: "28.8GW capacity, 11,000+ turbines",
        tags: ["Wind", "Projects", "Database"],
        lastUpdated: "2024-12-31"
    },
    {
        id: "repd",
        name: "Renewable Energy Planning Database",
        provider: "UK Government DESNZ",
        description: "UK renewable electricity projects ≥150kW through planning system",
        departments: ["renewables", "production"],
        quality: "high",
        freshness: "monthly",
        popularity: 91,
        apiCalls: 95000,
        isLive: false,
        accessType: "Open",
        sampleData: "150GW pipeline capacity",
        tags: ["Planning", "Pipeline", "Government"],
        lastUpdated: "2024-08-19"
    },
    {
        id: "bgs-co2-storage",
        name: "BGS CO2 Storage Database",
        provider: "British Geological Survey",
        description: "70+ billion tonnes UK seabed CO2 storage potential database",
        departments: ["ccus"],
        quality: "high",
        freshness: "quarterly",
        popularity: 76,
        apiCalls: 23000,
        isLive: false,
        accessType: "Open",
        sampleData: "78Gt storage capacity, geological data",
        tags: ["Storage", "Geological", "Database"],
        lastUpdated: "2024-09-30"
    },
    {
        id: "virtual-energy-system",
        name: "Virtual Energy System Programme",
        provider: "National Grid ESO",
        description: "Digital twin technology for GB energy system integration",
        departments: ["digital", "electricity-tds"],
        quality: "high",
        freshness: "daily",
        popularity: 83,
        apiCalls: 56000,
        isLive: false,
        accessType: "Restricted",
        sampleData: "Real-time system modeling",
        tags: ["Digital Twin", "System", "Grid"],
        lastUpdated: "2024-12-10"
    },
    {
        id: "fow-coe",
        name: "Floating Offshore Wind Centre of Excellence",
        provider: "ORE Catapult",
        description: "FOW technology development and cost reduction data",
        departments: ["fow"],
        quality: "high",
        freshness: "monthly",
        popularity: 74,
        apiCalls: 31000,
        isLive: false,
        accessType: "Open",
        sampleData: "£100/MWh LCOE target",
        tags: ["FOW", "Technology", "Research"],
        lastUpdated: "2024-12-01"
    },
    {
        id: "hydrogen-uk-database",
        name: "Hydrogen UK Economic Impact Data",
        provider: "Hydrogen UK",
        description: "Economic impact assessment for hydrogen sector to 2030",
        departments: ["hydrogen"],
        quality: "medium",
        freshness: "quarterly",
        popularity: 68,
        apiCalls: 19000,
        isLive: false,
        accessType: "Open",
        sampleData: "100,000 jobs, £18B GVA",
        tags: ["Economic", "Impact", "Analysis"],
        lastUpdated: "2024-04-01"
    },
    {
        id: "steel-industry-net-zero",
        name: "UK Steel Industry Net Zero Data",
        provider: "UK Steel Association",
        description: "Steel sector decarbonisation roadmap and project data",
        departments: ["industrial-decarb"],
        quality: "medium",
        freshness: "quarterly",
        popularity: 61,
        apiCalls: 15000,
        isLive: false,
        accessType: "Mixed",
        sampleData: "7Mt production, CCUS projects",
        tags: ["Steel", "Decarbonisation", "Industry"],
        lastUpdated: "2024-09-15"
    },
    {
        id: "oeuk-decommissioning",
        name: "OEUK Offshore Decommissioning Database",
        provider: "Offshore Energies UK",
        description: "£24.6B decommissioning programme with detailed activity data",
        departments: ["maintenance-decomm"],
        quality: "high",
        freshness: "quarterly",
        popularity: 59,
        apiCalls: 12000,
        isLive: false,
        accessType: "Membership",
        sampleData: "£24.6B programme, 470 installations",
        tags: ["Decommissioning", "Offshore", "Projects"],
        lastUpdated: "2024-02-23"
    },
    {
        id: "predictive-maintenance",
        name: "Renewable Energy Predictive Maintenance",
        provider: "Multiple Industry Sources",
        description: "AI and IoT-powered maintenance strategies for renewable assets",
        departments: ["ops", "digital"],
        quality: "medium",
        freshness: "monthly",
        popularity: 71,
        apiCalls: 28000,
        isLive: false,
        accessType: "Mixed",
        sampleData: "20% cost reduction potential",
        tags: ["Predictive", "Maintenance", "AI"],
        lastUpdated: "2024-07-31"
    },
    {
        id: "future-energy-scenarios",
        name: "Future Energy Scenarios Data",
        provider: "National Energy System Operator",
        description: "Long-term energy system scenarios and pathway analysis",
        departments: ["wild-card", "production"],
        quality: "high",
        freshness: "quarterly",
        popularity: 88,
        apiCalls: 52000,
        isLive: false,
        accessType: "Open",
        sampleData: "4 scenarios to 2050",
        tags: ["Scenarios", "Forecasting", "Strategy"],
        lastUpdated: "2024-07-15"
    }
];

// Application State
let currentPage = 'home';
let currentUser = {
    name: 'Sarah Chen',
    email: 'sarah.chen@nztc.com',
    subscription: 'professional',
    apiUsage: 8420,
    apiLimit: 10000,
    savedSources: 12,
    apiKeys: [
        {id: 'key-1', name: 'Production API', key: 'nztc_live_****7329', created: '2024-12-01', lastUsed: '2 hours ago'},
        {id: 'key-2', name: 'Development API', key: 'nztc_dev_****9156', created: '2024-11-15', lastUsed: '1 day ago'}
    ]
};

// Browse page state
let browseFilters = {
    search: '',
    department: '',
    quality: '',
    freshness: ''
};
let browseSort = 'relevance';
let currentPageNum = 1;
let filteredSources = [];

// DOM Elements
let navLinks, pageContents, breadcrumbList, userMenuBtn, userDropdown;
let featuredGrid, departmentGrid, pricingGrid;
let browseSearch, browseSearchBtn, departmentFilter, qualityFilter, freshnessFilter, browseResultsCount, browseSortSelect, browseGrid, browsePagination;
let activityList, apiKeysList, systemStatusGrid;
let contactModal, contactForm, closeContactModal, cancelContactBtn, contactSupportBtn;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('NZTC Data Discovery Platform initializing...');
    
    initializeDOMElements();
    initializeEventListeners();
    initializeNavigation();
    initializeHomePageData();
    initializeBrowsePageData();
    initializeDashboardData();
    initializeSupportData();
    
    console.log('Platform initialized successfully');
});

// Initialize DOM Elements
function initializeDOMElements() {
    // Navigation
    navLinks = document.querySelectorAll('.nav-link, [data-page], .logo');
    pageContents = document.querySelectorAll('.page-content');
    breadcrumbList = document.getElementById('breadcrumb-list');
    userMenuBtn = document.querySelector('.user-menu-btn');
    userDropdown = document.querySelector('.user-dropdown');
    
    // Home page
    featuredGrid = document.getElementById('featured-grid');
    departmentGrid = document.getElementById('department-grid');
    pricingGrid = document.getElementById('pricing-grid');
    
    // Browse page
    browseSearch = document.getElementById('browse-search');
    browseSearchBtn = document.getElementById('browse-search-btn');
    departmentFilter = document.getElementById('department-filter');
    qualityFilter = document.getElementById('quality-filter');
    freshnessFilter = document.getElementById('freshness-filter');
    browseResultsCount = document.getElementById('browse-results-count');
    browseSortSelect = document.getElementById('browse-sort');
    browseGrid = document.getElementById('browse-grid');
    browsePagination = document.getElementById('browse-pagination');
    
    // Dashboard
    activityList = document.getElementById('activity-list');
    apiKeysList = document.getElementById('api-keys-list');
    
    // Support
    systemStatusGrid = document.getElementById('system-status-grid');
    
    // Modals
    contactModal = document.getElementById('contact-modal');
    contactForm = document.getElementById('contact-form');
    closeContactModal = document.getElementById('close-contact-modal');
    cancelContactBtn = document.getElementById('cancel-contact');
    contactSupportBtn = document.getElementById('contact-support');
    
    console.log('DOM elements initialized');
}

// Initialize Event Listeners
function initializeEventListeners() {
    // Navigation - Fix for all navigation elements
    document.addEventListener('click', function(e) {
        const target = e.target.closest('[data-page]');
        if (target) {
            e.preventDefault();
            const targetPage = target.getAttribute('data-page');
            if (targetPage) {
                showPage(targetPage);
            }
        }
    });
    
    // User menu
    if (userMenuBtn) {
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleUserMenu();
        });
    }
    
    // Close user menu when clicking outside
    document.addEventListener('click', function(e) {
        if (userDropdown && !userMenuBtn?.contains(e.target)) {
            userDropdown.classList.add('hidden');
        }
    });
    
    // Browse page
    if (browseSearch) {
        browseSearch.addEventListener('input', handleBrowseSearch);
        browseSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyBrowseFilters();
            }
        });
    }
    
    if (browseSearchBtn) {
        browseSearchBtn.addEventListener('click', applyBrowseFilters);
    }
    
    [departmentFilter, qualityFilter, freshnessFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', handleFilterChange);
        }
    });
    
    if (browseSortSelect) {
        browseSortSelect.addEventListener('change', handleBrowseSortChange);
    }
    
    // Export button
    const exportBtn = document.getElementById('export-results');
    if (exportBtn) {
        exportBtn.addEventListener('click', handleExportResults);
    }
    
    // Pagination
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => changePage(currentPageNum - 1));
    }
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => changePage(currentPageNum + 1));
    }
    
    // API Key management
    const createApiKeyBtn = document.getElementById('create-api-key');
    if (createApiKeyBtn) {
        createApiKeyBtn.addEventListener('click', handleCreateApiKey);
    }
    
    // Contact modal
    if (contactSupportBtn) {
        contactSupportBtn.addEventListener('click', openContactModal);
    }
    
    if (closeContactModal) {
        closeContactModal.addEventListener('click', closeContactModalHandler);
    }
    
    if (cancelContactBtn) {
        cancelContactBtn.addEventListener('click', closeContactModalHandler);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Modal backdrop
    if (contactModal) {
        const backdrop = contactModal.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', closeContactModalHandler);
        }
    }
    
    // Documentation navigation
    const docsNavLinks = document.querySelectorAll('.docs-nav-link');
    docsNavLinks.forEach(link => {
        link.addEventListener('click', handleDocsNavigation);
    });
    
    console.log('Event listeners initialized');
}

// Navigation System
function initializeNavigation() {
    showPage('home');
    updateBreadcrumb(['Home']);
}

function showPage(pageId) {
    console.log('Navigating to page:', pageId);
    
    // Hide all pages
    pageContents.forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show target page
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        currentPage = pageId;
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
        
        // Update breadcrumb
        updateBreadcrumb(getBreadcrumbForPage(pageId));
        
        // Page-specific initialization
        switch(pageId) {
            case 'browse':
                setTimeout(() => {
                    applyBrowseFilters();
                }, 100);
                break;
            case 'dashboard':
                setTimeout(() => {
                    updateDashboardMetrics();
                }, 100);
                break;
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        console.log('Successfully navigated to:', pageId);
    } else {
        console.error('Page not found:', pageId);
    }
}

function getBreadcrumbForPage(pageId) {
    const breadcrumbs = {
        'home': ['Home'],
        'browse': ['Home', 'Browse Data'],
        'dashboard': ['Home', 'Dashboard'],
        'api': ['Home', 'API Access'],
        'docs': ['Home', 'Documentation'],
        'support': ['Home', 'Support']
    };
    return breadcrumbs[pageId] || ['Home'];
}

function updateBreadcrumb(items) {
    if (!breadcrumbList) return;
    
    breadcrumbList.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        if (index === items.length - 1) {
            li.textContent = item;
        } else {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = item;
            const pageMap = {'Home': 'home', 'Browse Data': 'browse', 'Dashboard': 'dashboard', 'API Access': 'api', 'Documentation': 'docs', 'Support': 'support'};
            link.setAttribute('data-page', pageMap[item] || 'home');
            li.appendChild(link);
        }
        breadcrumbList.appendChild(li);
    });
}

function toggleUserMenu() {
    if (userDropdown) {
        userDropdown.classList.toggle('hidden');
    }
}

// Home Page Data
function initializeHomePageData() {
    renderFeaturedSources();
    renderDepartmentGrid();
    renderPricingTiers();
}

function renderFeaturedSources() {
    if (!featuredGrid) return;
    
    featuredGrid.innerHTML = '';
    FEATURED_SOURCES.forEach(source => {
        const card = createFeaturedSourceCard(source);
        featuredGrid.appendChild(card);
    });
}

function createFeaturedSourceCard(source) {
    const card = document.createElement('div');
    card.className = `featured-data-card ${source.isLive ? 'live-data' : ''}`;
    
    const departmentBadges = source.departments.map(deptId => {
        const dept = APPLICATION_DATA.departments.find(d => d.id === deptId);
        return dept ? `<span class="card-tag" style="background-color: ${dept.color}20; color: ${dept.color};">${dept.name}</span>` : '';
    }).join('');
    
    card.innerHTML = `
        <div class="card-header">
            <div>
                <h3 class="card-title">${source.name}</h3>
                <p class="card-provider">by ${source.provider}</p>
            </div>
            <div class="card-badges">
                <span class="data-quality ${source.quality}">${source.quality.charAt(0).toUpperCase() + source.quality.slice(1)} Quality</span>
                ${source.isLive ? '<span class="live-badge"><i class="fas fa-circle"></i> LIVE</span>' : ''}
            </div>
        </div>
        
        <p class="card-description">${source.description}</p>
        
        <div class="card-tags">
            ${departmentBadges}
            ${source.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
        </div>
        
        <div class="card-meta">
            <div class="meta-item">
                <span class="meta-label">Popularity</span>
                <span class="meta-value">${source.popularity}%</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">API Calls</span>
                <span class="meta-value">${(source.apiCalls / 1000).toFixed(0)}K/month</span>
            </div>
        </div>
        
        <div class="card-actions">
            <button class="btn btn--primary btn--sm" onclick="viewSourceDetails('${source.id}')">
                View Details
            </button>
            <button class="btn btn--outline btn--sm" onclick="accessSourceData('${source.id}')">
                Access Data
            </button>
        </div>
    `;
    
    return card;
}

function renderDepartmentGrid() {
    if (!departmentGrid) return;
    
    departmentGrid.innerHTML = '';
    APPLICATION_DATA.departments.filter(dept => dept.sources > 0).forEach(dept => {
        const card = document.createElement('div');
        card.className = 'department-card';
        card.innerHTML = `
            <i class="${dept.icon} department-card-icon" style="color: ${dept.color};"></i>
            <h4 class="department-card-name">${dept.name}</h4>
            <p class="department-card-count">${dept.sources} data sources</p>
        `;
        card.addEventListener('click', () => {
            showPage('browse');
            setTimeout(() => {
                if (departmentFilter) {
                    departmentFilter.value = dept.id;
                    handleFilterChange();
                }
            }, 200);
        });
        departmentGrid.appendChild(card);
    });
}

function renderPricingTiers() {
    if (!pricingGrid) return;
    
    pricingGrid.innerHTML = '';
    APPLICATION_DATA.subscriptionTiers.forEach(tier => {
        const card = document.createElement('div');
        card.className = `pricing-card ${tier.featured ? 'featured' : ''}`;
        card.innerHTML = `
            <h3>${tier.name}</h3>
            <div class="pricing-price">${tier.price}</div>
            <ul class="pricing-features">
                ${tier.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <button class="btn ${tier.featured ? 'btn--primary' : 'btn--outline'} btn--full-width">
                ${tier.id === 'enterprise' ? 'Contact Sales' : 'Get Started'}
            </button>
        `;
        pricingGrid.appendChild(card);
    });
}

// Browse Page
function initializeBrowsePageData() {
    populateDepartmentFilter();
    filteredSources = [...DATA_SOURCES];
    applyBrowseFilters();
}

function populateDepartmentFilter() {
    if (!departmentFilter) return;
    
    // Clear existing options (except "All Departments")
    while (departmentFilter.children.length > 1) {
        departmentFilter.removeChild(departmentFilter.lastChild);
    }
    
    APPLICATION_DATA.departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept.id;
        option.textContent = dept.name;
        departmentFilter.appendChild(option);
    });
}

function handleBrowseSearch() {
    browseFilters.search = browseSearch ? browseSearch.value.toLowerCase().trim() : '';
}

function handleFilterChange() {
    browseFilters.department = departmentFilter ? departmentFilter.value : '';
    browseFilters.quality = qualityFilter ? qualityFilter.value : '';
    browseFilters.freshness = freshnessFilter ? freshnessFilter.value : '';
    applyBrowseFilters();
}

function handleBrowseSortChange() {
    browseSort = browseSortSelect ? browseSortSelect.value : 'relevance';
    applyBrowseFilters();
}

function applyBrowseFilters() {
    // Filter sources
    filteredSources = DATA_SOURCES.filter(source => {
        // Search filter
        if (browseFilters.search && !searchMatches(source, browseFilters.search)) {
            return false;
        }
        
        // Department filter
        if (browseFilters.department && !source.departments.includes(browseFilters.department)) {
            return false;
        }
        
        // Quality filter
        if (browseFilters.quality && source.quality !== browseFilters.quality) {
            return false;
        }
        
        // Freshness filter
        if (browseFilters.freshness && source.freshness !== browseFilters.freshness) {
            return false;
        }
        
        return true;
    });
    
    // Sort sources
    sortBrowseResults();
    
    // Reset to page 1
    currentPageNum = 1;
    
    // Render results
    renderBrowseResults();
    updateBrowseResultsCount();
    updateBrowsePagination();
}

function searchMatches(source, searchTerm) {
    const searchFields = [
        source.name,
        source.provider,
        source.description,
        source.sampleData,
        ...source.tags,
        ...source.departments.map(deptId => {
            const dept = APPLICATION_DATA.departments.find(d => d.id === deptId);
            return dept ? dept.name : '';
        })
    ].join(' ').toLowerCase();
    
    return searchFields.includes(searchTerm);
}

function sortBrowseResults() {
    switch(browseSort) {
        case 'popularity':
            filteredSources.sort((a, b) => b.popularity - a.popularity);
            break;
        case 'quality':
            const qualityOrder = { high: 3, medium: 2, low: 1 };
            filteredSources.sort((a, b) => qualityOrder[b.quality] - qualityOrder[a.quality]);
            break;
        case 'freshness':
            const freshnessOrder = { realtime: 5, daily: 4, weekly: 3, monthly: 2, quarterly: 1 };
            filteredSources.sort((a, b) => freshnessOrder[b.freshness] - freshnessOrder[a.freshness]);
            break;
        case 'name':
            filteredSources.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'relevance':
        default:
            if (browseFilters.search) {
                filteredSources.sort((a, b) => {
                    const aScore = getRelevanceScore(a, browseFilters.search);
                    const bScore = getRelevanceScore(b, browseFilters.search);
                    return bScore - aScore;
                });
            } else {
                filteredSources.sort((a, b) => {
                    if (a.isLive && !b.isLive) return -1;
                    if (!a.isLive && b.isLive) return 1;
                    return b.popularity - a.popularity;
                });
            }
            break;
    }
}

function getRelevanceScore(source, searchTerm) {
    let score = 0;
    const term = searchTerm.toLowerCase();
    
    if (source.name.toLowerCase().includes(term)) score += 10;
    if (source.provider.toLowerCase().includes(term)) score += 5;
    if (source.description.toLowerCase().includes(term)) score += 3;
    source.tags.forEach(tag => {
        if (tag.toLowerCase().includes(term)) score += 2;
    });
    
    return score;
}

function renderBrowseResults() {
    if (!browseGrid) return;
    
    browseGrid.innerHTML = '';
    
    if (filteredSources.length === 0) {
        browseGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--color-text-secondary);">
                <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                <h3 style="margin-bottom: 8px;">No data sources found</h3>
                <p>Try adjusting your search terms or filters</p>
            </div>
        `;
        return;
    }
    
    // Pagination
    const startIndex = (currentPageNum - 1) * PLATFORM_CONFIG.itemsPerPage;
    const endIndex = startIndex + PLATFORM_CONFIG.itemsPerPage;
    const pageResults = filteredSources.slice(startIndex, endIndex);
    
    pageResults.forEach(source => {
        const card = createBrowseSourceCard(source);
        browseGrid.appendChild(card);
    });
}

function createBrowseSourceCard(source) {
    const card = document.createElement('div');
    card.className = `featured-data-card ${source.isLive ? 'live-data' : ''}`;
    
    const departmentBadges = source.departments.map(deptId => {
        const dept = APPLICATION_DATA.departments.find(d => d.id === deptId);
        return dept ? `<span class="card-tag" style="background-color: ${dept.color}20; color: ${dept.color};">${dept.name}</span>` : '';
    }).join('');
    
    const freshnessIcon = getFreshnessIcon(source.freshness);
    const accessBadge = getAccessBadge(source.accessType);
    
    card.innerHTML = `
        <div class="card-header">
            <div>
                <h3 class="card-title">${source.name}</h3>
                <p class="card-provider">by ${source.provider}</p>
            </div>
            <div class="card-badges">
                <span class="data-quality ${source.quality}">${source.quality.charAt(0).toUpperCase() + source.quality.slice(1)} Quality</span>
                ${source.isLive ? '<span class="live-badge"><i class="fas fa-circle"></i> LIVE</span>' : ''}
                ${accessBadge}
            </div>
        </div>
        
        <p class="card-description">${source.description}</p>
        
        <div class="card-tags">
            ${departmentBadges}
            ${source.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
        </div>
        
        <div class="card-meta">
            <div class="meta-item">
                <span class="meta-label">Update Frequency</span>
                <span class="meta-value">${freshnessIcon} ${source.freshness.charAt(0).toUpperCase() + source.freshness.slice(1)}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Popularity</span>
                <span class="meta-value">${source.popularity}%</span>
            </div>
        </div>
        
        <div class="card-actions">
            <button class="btn btn--primary btn--sm" onclick="viewSourceDetails('${source.id}')">
                View Details
            </button>
            <button class="btn btn--outline btn--sm" onclick="accessSourceData('${source.id}')">
                ${source.accessType === 'Open' ? 'Access Data' : 'Request Access'}
            </button>
        </div>
    `;
    
    return card;
}

function updateBrowseResultsCount() {
    if (!browseResultsCount) return;
    
    const count = filteredSources.length;
    const liveCount = filteredSources.filter(s => s.isLive).length;
    const plural = count === 1 ? '' : 's';
    
    let countText = `${count} data source${plural} found`;
    if (liveCount > 0) {
        countText += ` (${liveCount} live)`;
    }
    
    browseResultsCount.textContent = countText;
}

function updateBrowsePagination() {
    if (!browsePagination) return;
    
    const totalPages = Math.ceil(filteredSources.length / PLATFORM_CONFIG.itemsPerPage);
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    
    if (prevBtn) {
        prevBtn.disabled = currentPageNum <= 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPageNum >= totalPages;
    }
    
    if (pageInfo) {
        pageInfo.textContent = `Page ${currentPageNum} of ${totalPages}`;
    }
}

function changePage(pageNum) {
    const totalPages = Math.ceil(filteredSources.length / PLATFORM_CONFIG.itemsPerPage);
    if (pageNum >= 1 && pageNum <= totalPages) {
        currentPageNum = pageNum;
        renderBrowseResults();
        updateBrowsePagination();
        
        // Scroll to top of results
        if (browseGrid) {
            browseGrid.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function handleExportResults() {
    const exportData = filteredSources.map(source => ({
        name: source.name,
        provider: source.provider,
        departments: source.departments.join(', '),
        quality: source.quality,
        freshness: source.freshness,
        access: source.accessType,
        popularity: source.popularity
    }));
    
    const csv = convertToCSV(exportData);
    downloadCSV(csv, 'nztc-data-sources.csv');
    
    // Show success message
    showNotification('Data sources exported successfully!', 'success');
}

function convertToCSV(data) {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');
    
    return csvContent;
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

// Dashboard Page
function initializeDashboardData() {
    renderRecentActivity();
    renderApiKeys();
    updateDashboardMetrics();
}

function renderRecentActivity() {
    if (!activityList) return;
    
    activityList.innerHTML = '';
    APPLICATION_DATA.recentActivity.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-info">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-details">
                    <h4>${activity.action}</h4>
                    <p>${activity.source} by ${activity.user}</p>
                </div>
            </div>
            <div class="activity-time">${activity.time}</div>
        `;
        activityList.appendChild(item);
    });
}

function renderApiKeys() {
    if (!apiKeysList) return;
    
    apiKeysList.innerHTML = '';
    currentUser.apiKeys.forEach(key => {
        const item = document.createElement('div');
        item.className = 'api-key-item';
        item.innerHTML = `
            <div class="api-key-info">
                <h4>${key.name}</h4>
                <p>${key.key}</p>
                <small>Created: ${key.created} • Last used: ${key.lastUsed}</small>
            </div>
            <div class="api-key-actions">
                <button class="btn btn--outline btn--sm" onclick="copyApiKey('${key.key}')">
                    <i class="fas fa-copy"></i> Copy
                </button>
                <button class="btn btn--outline btn--sm" onclick="regenerateApiKey('${key.id}')">
                    <i class="fas fa-sync"></i> Regenerate
                </button>
                <button class="btn btn--outline btn--sm" onclick="deleteApiKey('${key.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        apiKeysList.appendChild(item);
    });
}

function updateDashboardMetrics() {
    // Update progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const percentage = (currentUser.apiUsage / currentUser.apiLimit) * 100;
        progressFill.style.width = `${percentage}%`;
    }
}

// Support Page
function initializeSupportData() {
    renderSystemStatus();
}

function renderSystemStatus() {
    if (!systemStatusGrid) return;
    
    const systemComponents = [
        { name: 'API Gateway', status: 'online' },
        { name: 'NESO Integration', status: 'online' },
        { name: 'PV_Live Integration', status: 'online' },
        { name: 'Marine Weather API', status: 'online' },
        { name: 'Database', status: 'online' },
        { name: 'Authentication', status: 'online' }
    ];
    
    systemStatusGrid.innerHTML = '';
    systemComponents.forEach(component => {
        const item = document.createElement('div');
        item.className = 'status-item';
        item.innerHTML = `
            <span>${component.name}</span>
            <span class="status-indicator ${component.status}"></span>
        `;
        systemStatusGrid.appendChild(item);
    });
}

// Documentation Navigation
function handleDocsNavigation(e) {
    e.preventDefault();
    const targetSection = e.currentTarget.getAttribute('data-section');
    
    // Update active link
    document.querySelectorAll('.docs-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    // Show target section
    document.querySelectorAll('.docs-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    const targetElement = document.getElementById(`docs-${targetSection}`);
    if (targetElement) {
        targetElement.classList.remove('hidden');
    }
}

// Modal Functions
function openContactModal() {
    if (contactModal) {
        contactModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeContactModalHandler() {
    if (contactModal) {
        contactModal.classList.add('hidden');
        document.body.style.overflow = '';
        if (contactForm) {
            contactForm.reset();
        }
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    setTimeout(() => {
        closeContactModalHandler();
        showNotification('Support ticket submitted successfully! We\'ll get back to you within 24 hours.', 'success');
    }, 500);
}

// API Key Management
function handleCreateApiKey() {
    const keyName = prompt('Enter a name for your new API key:');
    if (keyName) {
        const newKey = {
            id: `key-${Date.now()}`,
            name: keyName,
            key: `nztc_${generateApiKey()}`,
            created: new Date().toLocaleDateString(),
            lastUsed: 'Never'
        };
        
        currentUser.apiKeys.push(newKey);
        renderApiKeys();
        showNotification('API key created successfully!', 'success');
    }
}

function copyApiKey(key) {
    navigator.clipboard.writeText(key.replace('****', 'prod')).then(() => {
        showNotification('API key copied to clipboard!', 'success');
    });
}

function regenerateApiKey(keyId) {
    if (confirm('Are you sure you want to regenerate this API key? This will invalidate the current key.')) {
        const keyIndex = currentUser.apiKeys.findIndex(k => k.id === keyId);
        if (keyIndex !== -1) {
            currentUser.apiKeys[keyIndex].key = `nztc_${generateApiKey()}`;
            renderApiKeys();
            showNotification('API key regenerated successfully!', 'success');
        }
    }
}

function deleteApiKey(keyId) {
    if (confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
        currentUser.apiKeys = currentUser.apiKeys.filter(k => k.id !== keyId);
        renderApiKeys();
        showNotification('API key deleted successfully!', 'success');
    }
}

function generateApiKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Source Actions
function viewSourceDetails(sourceId) {
    const source = DATA_SOURCES.find(s => s.id === sourceId);
    if (!source) return;
    
    let detailsText = `${source.name}\n\n`;
    detailsText += `Provider: ${source.provider}\n`;
    detailsText += `Departments: ${source.departments.map(deptId => {
        const dept = APPLICATION_DATA.departments.find(d => d.id === deptId);
        return dept ? dept.name : deptId;
    }).join(', ')}\n`;
    detailsText += `Quality: ${source.quality.charAt(0).toUpperCase() + source.quality.slice(1)}\n`;
    detailsText += `Update Frequency: ${source.freshness.charAt(0).toUpperCase() + source.freshness.slice(1)}\n`;
    detailsText += `Access Type: ${source.accessType}\n`;
    detailsText += `Popularity: ${source.popularity}%\n`;
    
    if (source.isLive) {
        detailsText += `\nLIVE DATA:\n${source.sampleData}\n`;
    }
    
    detailsText += `\nThis would typically open a comprehensive detail page with API documentation, sample data previews, integration guides, and usage examples.`;
    
    alert(detailsText);
}

function accessSourceData(sourceId) {
    const source = DATA_SOURCES.find(s => s.id === sourceId);
    if (!source) return;
    
    if (source.accessType === 'Open') {
        alert(`Accessing open data source: ${source.name}\n\nThis would typically:\n- Redirect to the API endpoint\n- Provide sample code\n- Show integration examples\n- Track usage statistics`);
    } else {
        alert(`Access requested for: ${source.name}\n\nThis would typically:\n- Check your subscription level\n- Generate API access tokens\n- Provide integration documentation\n- Set up usage monitoring`);
    }
}

// Utility Functions
function getQualityClass(quality) {
    const classes = {
        high: 'success',
        medium: 'warning',
        low: 'error'
    };
    return classes[quality] || 'info';
}

function getFreshnessIcon(freshness) {
    const icons = {
        realtime: '<i class="fas fa-bolt"></i>',
        daily: '<i class="fas fa-clock"></i>',
        weekly: '<i class="fas fa-calendar-week"></i>',
        monthly: '<i class="fas fa-calendar-alt"></i>',
        quarterly: '<i class="fas fa-calendar"></i>'
    };
    return icons[freshness] || '<i class="fas fa-clock"></i>';
}

function getAccessBadge(accessType) {
    const badgeClasses = {
        'Open': 'success',
        'Restricted': 'warning',
        'Membership': 'info',
        'Mixed': 'info'
    };
    const badgeClass = badgeClasses[accessType] || 'info';
    return `<span class="status status--${badgeClass}">${accessType}</span>`;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 2000;
        max-width: 400px;
        font-size: 14px;
        color: var(--color-text);
    `;
    
    if (type === 'success') {
        notification.style.borderColor = 'var(--color-success)';
        notification.style.color = 'var(--color-success)';
    } else if (type === 'error') {
        notification.style.borderColor = 'var(--color-error)';
        notification.style.color = 'var(--color-error)';
    }
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Global API for external access
window.NZTCPlatform = {
    showPage,
    searchSources: (query) => {
        showPage('browse');
        setTimeout(() => {
            if (browseSearch) {
                browseSearch.value = query;
                handleBrowseSearch();
                applyBrowseFilters();
            }
        }, 200);
    },
    filterByDepartment: (deptId) => {
        showPage('browse');
        setTimeout(() => {
            if (departmentFilter) {
                departmentFilter.value = deptId;
                handleFilterChange();
            }
        }, 200);
    },
    getCurrentUser: () => currentUser,
    getDataSources: () => DATA_SOURCES,
    getDepartments: () => APPLICATION_DATA.departments
};

console.log('NZTC Data Discovery Platform loaded successfully');