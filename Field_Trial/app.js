// Application Configuration
const CONFIG = {
    map: {
        center: [54.5, -2.0],
        zoom: 6,
        minZoom: 5,
        maxZoom: 18
    }
};

///////////// Weather Layer Color Schemes ////////////////

const WEATHER_LAYERS = {
    wind: {
        name: 'Wind Speed',
        unit: 'm/s',
        colorScale: [
            { min: 0, max: 3, color: '#313695', label: 'Calm (0-3)' },
            { min: 3, max: 6, color: '#4575b4', label: 'Light breeze (3-6)' },
            { min: 6, max: 9, color: '#74add1', label: 'Moderate breeze (6-9)' },
            { min: 9, max: 12, color: '#fdae61', label: 'Fresh breeze (9-12)' },
            { min: 12, max: 15, color: '#f46d43', label: 'Strong breeze (12-15)' },
            { min: 15, max: 25, color: '#d73027', label: 'Gale (15+)' }
        ]
    },
    temperature: {
        name: 'Temperature',
        unit: '°C',
        colorScale: [
            { min: -5, max: 2, color: '#313695', label: 'Very cold (-5 to 2)' },
            { min: 2, max: 8, color: '#4575b4', label: 'Cold (2 to 8)' },
            { min: 8, max: 14, color: '#74add1', label: 'Cool (8 to 14)' },
            { min: 14, max: 18, color: '#fee090', label: 'Mild (14 to 18)' },
            { min: 18, max: 22, color: '#fdae61', label: 'Warm (18 to 22)' },
            { min: 22, max: 30, color: '#d73027', label: 'Hot (22+)' }
        ]
    },
    precipitation: {
        name: 'Precipitation',
        unit: 'mm/h',
        colorScale: [
            { min: 0, max: 0.5, color: 'transparent', label: 'No rain (0-0.5)' },
            { min: 0.5, max: 1, color: '#c6dbef', label: 'Light rain (0.5-1)' },
            { min: 1, max: 2, color: '#6baed6', label: 'Moderate rain (1-2)' },
            { min: 2, max: 4, color: '#4292c6', label: 'Heavy rain (2-4)' },
            { min: 4, max: 8, color: '#2171b5', label: 'Very heavy (4-8)' },
            { min: 8, max: 20, color: '#08519c', label: 'Extreme (8+)' }
        ]
    },
    solar: {
        name: 'Solar Irradiation',
        unit: 'kWh/m²/day',
        colorScale: [
            { min: 0, max: 2, color: '#313695', label: 'Very low (0-2)' },
            { min: 2, max: 3, color: '#4575b4', label: 'Low (2-3)' },
            { min: 3, max: 4, color: '#74add1', label: 'Moderate (3-4)' },
            { min: 4, max: 5, color: '#fee090', label: 'Good (4-5)' },
            { min: 5, max: 6, color: '#fdae61', label: 'High (5-6)' },
            { min: 6, max: 8, color: '#d73027', label: 'Excellent (6+)' }
        ]
    }
};

// Application State
let map;
let markers = [];
let weatherLayers = {};
let weatherMarker = null;
let filteredTrials = [];
let isMobile = window.innerWidth <= 768;
let baseLayers = {};
let lastWeatherUpdate = null;

//////////////// Field Trials Data /////////////////////////

const fieldTrials = [
    {
        "id": "FT001",
        "name": "Hornsea One Offshore Wind Farm",
        "technology": "wind",
        "company": "Ørsted",
        "lat": 53.9167,
        "lng": 1.7833,
        "status": "completed",
        "capacity": "1218 MW",
        "description": "World's largest operational offshore wind farm at time of completion",
        "locationRationale": "Optimal wind conditions with average speeds of 9.2 m/s, suitable water depth, excellent wind resource consistency",
        "performance": {
            "capacityFactor": "52%",
            "annualGeneration": "6,000 GWh"
        },
        "environmental": {
            "avgWindSpeed": "9.2 m/s",
            "avgTemperature": "8.5°C",
            "waterDepth": "15-22m"
        }
    },
    {
        "id": "FT002",
        "name": "Cleve Hill Solar Park",
        "technology": "solar",
        "company": "Quinbrook Infrastructure",
        "lat": 51.3614,
        "lng": 0.9892,
        "status": "completed",
        "capacity": "350 MW",
        "description": "One of UK's largest solar farms with battery storage",
        "locationRationale": "High solar irradiation levels of 1100 kWh/m²/year, flat terrain, minimal shading",
        "performance": {
            "capacityFactor": "11.5%",
            "batteryStorage": "150 MW"
        },
        "environmental": {
            "avgSolarIrradiation": "1100 kWh/m²/year",
            "avgTemperature": "10.5°C",
            "avgWindSpeed": "4.2 m/s"
        }
    },
    {
        "id": "FT003",
        "name": "Dogger Bank Wind Farm",
        "technology": "wind",
        "company": "SSE/Equinor",
        "lat": 54.5,
        "lng": 2.0,
        "status": "ongoing",
        "capacity": "3600 MW",
        "description": "World's largest offshore wind farm under construction",
        "locationRationale": "Exceptional wind resource with 10.1 m/s average, optimal water depth, consistent conditions",
        "performance": {
            "expectedCapacityFactor": "60%+",
            "turbineCount": "277"
        },
        "environmental": {
            "avgWindSpeed": "10.1 m/s",
            "waterDepth": "18-35m",
            "avgTemperature": "7.8°C"
        }
    },
    {
        "id": "FT004",
        "name": "Shotton Hydrogen Hub",
        "technology": "hydrogen",
        "company": "Tata Steel",
        "lat": 53.2167,
        "lng": -3.0333,
        "status": "ongoing",
        "capacity": "20 MW electrolyser",
        "description": "Green hydrogen production for steel manufacturing",
        "locationRationale": "Co-location with steel plant, abundant wind energy access, skilled workforce",
        "performance": {
            "hydrogenProduction": "8 tonnes/day",
            "efficiency": "65%"
        },
        "environmental": {
            "avgWindSpeed": "6.8 m/s",
            "avgTemperature": "9.2°C",
            "renewableAccess": "95%"
        }
    },
    {
        "id": "FT005",
        "name": "Trafford Energy Park CCUS",
        "technology": "carbon_capture",
        "company": "Carlton Power",
        "lat": 53.4067,
        "lng": -2.3581,
        "status": "ongoing",
        "capacity": "2.5 Mt CO2/year",
        "description": "Industrial carbon capture and storage demonstration",
        "locationRationale": "Proximity to industrial emitters, geological storage access, transport links",
        "performance": {
            "captureRate": "95%",
            "currentCapacity": "500,000 tonnes/year"
        },
        "environmental": {
            "avgTemperature": "9.8°C",
            "avgPrecipitation": "800 mm/year",
            "geologicalSuitability": "Excellent"
        }
    },
    {
        "id": "FT006",
        "name": "Minety Battery Storage",
        "technology": "battery",
        "company": "Penso Power",
        "lat": 51.5833,
        "lng": -2.0833,
        "status": "completed",
        "capacity": "100 MW/100 MWh",
        "description": "Grid-scale battery providing frequency response services",
        "locationRationale": "Strategic grid connection, favorable planning, community acceptance",
        "performance": {
            "efficiency": "90%",
            "responseTime": "1 second"
        },
        "environmental": {
            "avgTemperature": "10.1°C",
            "operatingRange": "-10°C to 45°C",
            "avgHumidity": "75%"
        }
    },
    {
        "id": "FT007",
        "name": "Swansea Bay Tidal Lagoon",
        "technology": "tidal",
        "company": "Tidal Lagoon Power",
        "lat": 51.6333,
        "lng": -3.9167,
        "status": "planned",
        "capacity": "320 MW",
        "description": "World's first tidal lagoon power plant",
        "locationRationale": "Exceptional 8.5m tidal range, suitable seabed, minimal environmental impact",
        "performance": {
            "expectedCapacityFactor": "19%",
            "predictability": "100% for 120 years"
        },
        "environmental": {
            "tidalRange": "8.5m",
            "avgTemperature": "11.2°C",
            "seabedType": "Sand and mud"
        }
    },
    {
        "id": "FT008",
        "name": "Hinkley Point C Nuclear",
        "technology": "nuclear",
        "company": "EDF Energy",
        "lat": 51.2167,
        "lng": -3.1333,
        "status": "ongoing",
        "capacity": "3200 MW",
        "description": "New nuclear power station with EPR technology",
        "locationRationale": "Existing nuclear site, cooling water access, established grid connections",
        "performance": {
            "expectedCapacityFactor": "90%",
            "operationalLife": "60 years"
        },
        "environmental": {
            "coolingWater": "Bristol Channel",
            "avgSeaTemperature": "12.5°C",
            "thermalDischarge": "<3°C rise"
        }
    },
    {
        "id": "FT009",
        "name": "Drax Biomass Conversion",
        "technology": "biomass",
        "company": "Drax Group",
        "lat": 53.7333,
        "lng": -1.0167,
        "status": "completed",
        "capacity": "2580 MW",
        "description": "Conversion from coal to sustainable biomass",
        "locationRationale": "Existing infrastructure, transport links, cooling water availability",
        "performance": {
            "emissionReduction": "80% vs coal",
            "efficiency": "38%"
        },
        "environmental": {
            "avgTemperature": "9.5°C",
            "coolingWater": "River Ouse",
            "fuelSource": "Sustainable pellets"
        }
    },
    {
        "id": "FT010",
        "name": "Orkney Renewable Hub",
        "technology": "hydrogen",
        "company": "EMEC",
        "lat": 59.0,
        "lng": -3.0,
        "status": "completed",
        "capacity": "0.5 MW",
        "description": "Integrated renewable energy with hydrogen production",
        "locationRationale": "Abundant renewables, island constraints, innovation ecosystem",
        "performance": {
            "renewableIntegration": "100%",
            "efficiency": "60%"
        },
        "environmental": {
            "avgWindSpeed": "8.5 m/s",
            "avgTemperature": "8.1°C",
            "tidalRange": "3.2m"
        }
    },
    {
        "id": "FT011",
        "name": "Teesside Hydrogen Cluster",
        "technology": "hydrogen",
        "company": "BP/Equinor",
        "lat": 54.5742,
        "lng": -1.2349,
        "status": "ongoing",
        "capacity": "1000 MW blue H2",
        "description": "Large-scale blue hydrogen with carbon capture",
        "locationRationale": "Industrial infrastructure, gas supply, CO2 storage access",
        "performance": {
            "hydrogenProduction": "300,000 tonnes/year",
            "carbonCapture": "98%"
        },
        "environmental": {
            "avgTemperature": "9.1°C",
            "industrialSynergy": "50+ users",
            "co2Storage": "Offshore aquifer"
        }
    },
    {
        "id": "FT012",
        "name": "Rampion Extension",
        "technology": "wind",
        "company": "RWE",
        "lat": 50.7,
        "lng": -0.3,
        "status": "planned",
        "capacity": "1200 MW",
        "description": "Extension to existing offshore wind farm",
        "locationRationale": "Proven wind resource, reduced visual impact, shallow waters",
        "performance": {
            "expectedCapacityFactor": "50%",
            "turbineCount": "90"
        },
        "environmental": {
            "avgWindSpeed": "8.8 m/s",
            "waterDepth": "20-45m",
            "distanceFromShore": "13km"
        }
    },
    {
        "id": "FT013",
        "name": "Sunnica Solar Farm",
        "technology": "solar",
        "company": "Sunnica Ltd",
        "lat": 52.3333,
        "lng": 0.5,
        "status": "planned",
        "capacity": "500 MW",
        "description": "Large-scale solar with battery storage",
        "locationRationale": "High solar irradiation in East Anglia, grid capacity",
        "performance": {
            "expectedCapacityFactor": "12%",
            "batteryStorage": "200 MW/400 MWh"
        },
        "environmental": {
            "avgSolarIrradiation": "1050 kWh/m²/year",
            "avgTemperature": "10.2°C",
            "landArea": "2,792 hectares"
        }
    },
    {
        "id": "FT014",
        "name": "Moray West Wind Farm",
        "technology": "wind",
        "company": "Ocean Winds",
        "lat": 57.85,
        "lng": -2.85,
        "status": "ongoing",
        "capacity": "882 MW",
        "description": "Scottish offshore wind using 15MW turbines",
        "locationRationale": "Exceptional Scottish wind resource, suitable water depth",
        "performance": {
            "expectedCapacityFactor": "58%",
            "turbineCount": "60"
        },
        "environmental": {
            "avgWindSpeed": "9.8 m/s",
            "waterDepth": "40-60m",
            "avgTemperature": "7.5°C"
        }
    },
    {
        "id": "FT015",
        "name": "Keadby Carbon Capture",
        "technology": "carbon_capture",
        "company": "SSE Thermal",
        "lat": 53.5833,
        "lng": -0.7333,
        "status": "ongoing",
        "capacity": "910 MW with CCS",
        "description": "Gas power station with post-combustion capture",
        "locationRationale": "River cooling access, CO2 pipeline to Humber storage",
        "performance": {
            "captureRate": "95%",
            "co2Captured": "1.5 Mt/year"
        },
        "environmental": {
            "coolingWater": "River Trent",
            "avgTemperature": "9.7°C",
            "efficiency": "55% with CCS"
        }
    }
];

const technologies = [
    {"id": "wind", "name": "Wind Energy", "color": "#4A90E2", "icon": "W"},
    {"id": "solar", "name": "Solar Energy", "color": "#F5A623", "icon": "S"},
    {"id": "battery", "name": "Battery Storage", "color": "#7ED321", "icon": "B"},
    {"id": "hydrogen", "name": "Hydrogen", "color": "#9013FE", "icon": "H"},
    {"id": "carbon_capture", "name": "Carbon Capture", "color": "#6D7278", "icon": "C"},
    {"id": "biomass", "name": "Biomass", "color": "#8B4513", "icon": "M"},
    {"id": "tidal", "name": "Tidal Energy", "color": "#00BCD4", "icon": "T"},
    {"id": "nuclear", "name": "Nuclear", "color": "#FF5722", "icon": "N"}
];

const companies = [...new Set(fieldTrials.map(trial => trial.company))];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application...');
    
    setTimeout(() => {
        initializeMap();
        setupEventListeners();
        populateFilters();
        populateLegend();
        populateWeatherLegends();
        updateTrialMarkers();
        checkMobileLayout();
        
        console.log('Application initialized successfully');
    }, 100);
});

// Map Initialization
function initializeMap() {
    console.log('Initializing map...');
    
    map = L.map('map', {
        zoomControl: true
    }).setView(CONFIG.map.center, CONFIG.map.zoom);
    
    // Base tile layers
    ///// map
    baseLayers = {
        street: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: CONFIG.map.maxZoom
        }),
        satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri',
            maxZoom: CONFIG.map.maxZoom
        }),
        terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap',
            maxZoom: CONFIG.map.maxZoom
        })
    };
    
    baseLayers.street.addTo(map);
    
    // Add click handler for weather data
    map.on('click', handleMapClick);
    
    console.log('Map initialized');
}

// Event Listeners Setup
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Base map switching
    document.querySelectorAll('input[name="basemap"]').forEach(radio => {
        radio.addEventListener('change', function() {
            switchBaseMap(this.value);
        });
    });
    
    // Weather layer toggles
    setupWeatherLayerControls();
    
    // Filter controls
    const companyFilter = document.getElementById('companyFilter');
    const statusFilter = document.getElementById('statusFilter');
    const clearFilters = document.getElementById('clearFilters');
    
    if (companyFilter) companyFilter.addEventListener('change', applyFilters);
    if (statusFilter) statusFilter.addEventListener('change', applyFilters);
    if (clearFilters) clearFilters.addEventListener('click', clearAllFilters);
    
    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn) searchBtn.addEventListener('click', performSearch);
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Control buttons
    const exportBtn = document.getElementById('exportBtn');
    const refreshDataBtn = document.getElementById('refreshDataBtn');
    const refreshAllLayers = document.getElementById('refreshAllLayers');
    const getLocationDataBtn = document.getElementById('getLocationDataBtn');
    const hideMapInfo = document.getElementById('hideMapInfo');
    
    if (exportBtn) exportBtn.addEventListener('click', exportData);
    if (refreshDataBtn) refreshDataBtn.addEventListener('click', refreshWeatherData);
    if (refreshAllLayers) refreshAllLayers.addEventListener('click', refreshAllWeatherLayers);
    if (getLocationDataBtn) getLocationDataBtn.addEventListener('click', enableLocationSelection);
    if (hideMapInfo) hideMapInfo.addEventListener('click', hideMapInfoOverlay);
    
    // Sidebar controls
    const closeSidebar = document.getElementById('closeSidebar');
    if (closeSidebar) closeSidebar.addEventListener('click', closeSidebarPanel);
    
    // Toast close
    const toastClose = document.getElementById('toastClose');
    if (toastClose) toastClose.addEventListener('click', hideToast);
    
    // Window resize
    window.addEventListener('resize', function() {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;
        if (wasMobile !== isMobile) {
            handleResponsiveChanges();
        }
    });
    
    console.log('Event listeners set up');
}

// Setup Weather Layer Controls
function setupWeatherLayerControls() {
    const layerMappings = [
        { id: 'windLayer', type: 'wind', opacityId: 'windOpacity', statusId: 'windStatus' },
        { id: 'temperatureLayer', type: 'temperature', opacityId: 'temperatureOpacity', statusId: 'temperatureStatus' },
        { id: 'precipitationLayer', type: 'precipitation', opacityId: 'precipitationOpacity', statusId: 'precipitationStatus' },
        { id: 'solarLayer', type: 'solar', opacityId: 'solarOpacity', statusId: 'solarStatus' }
    ];
    
    layerMappings.forEach(mapping => {
        const checkbox = document.getElementById(mapping.id);
        const opacitySlider = document.getElementById(mapping.opacityId);
        
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                console.log(`Toggling ${mapping.type} layer:`, this.checked);
                toggleWeatherLayer(mapping.type, this.checked);
                updateLayerStatus(mapping.statusId, this.checked);
                updateLayerItemStyle(this.closest('.layer-item'), this.checked);
            });
        }
        
        if (opacitySlider) {
            opacitySlider.addEventListener('input', function() {
                updateLayerOpacity(mapping.type, this.value / 100);
                updateOpacityDisplay(mapping.opacityId, this.value);
            });
        }
    });
}

// Weather Layer Management - POLYGON-BASED IMPLEMENTATION
function toggleWeatherLayer(layerType, enabled) {
    console.log('Toggling weather layer:', layerType, enabled);
    
    if (enabled) {
        loadWeatherLayer(layerType);
        showWeatherLegend(layerType);
    } else {
        removeWeatherLayer(layerType);
        hideWeatherLegend(layerType);
    }
}

function loadWeatherLayer(layerType) {
    console.log('Loading weather layer:', layerType);
    showLoading();
    
    // Remove existing layer if present
    removeWeatherLayer(layerType);
    
    // Create polygon-based weather layer
    const polygonGroup = createPolygonWeatherLayer(layerType);
    weatherLayers[layerType] = polygonGroup;
    
    // Add to map with slight delay for visual feedback
    setTimeout(() => {
        polygonGroup.addTo(map);
        
        // Set initial opacity
        const opacityMapping = {
            'wind': 'windOpacity',
            'temperature': 'temperatureOpacity',
            'precipitation': 'precipitationOpacity',
            'solar': 'solarOpacity'
        };
        
        const opacitySlider = document.getElementById(opacityMapping[layerType]);
        if (opacitySlider) {
            updateLayerOpacity(layerType, opacitySlider.value / 100);
        }
        
        hideLoading();
        updateLastUpdated();
        showToast(`${WEATHER_LAYERS[layerType].name} layer loaded - ${polygonGroup.getLayers().length} polygons visible`, 'success');
    }, 200);
}

function createPolygonWeatherLayer(layerType) {
    const polygonGroup = L.layerGroup();
    const gridSize = 0.4; // Degrees - smaller grid for more detail
    
    // Define UK bounds more precisely
    const bounds = {
        north: 61,
        south: 49.5,
        east: 2.5,
        west: -8.5
    };
    
    console.log(`Creating ${layerType} polygons...`);
    let polygonCount = 0;
    
    // Generate grid of polygons across UK
    for (let lat = bounds.south; lat < bounds.north; lat += gridSize) {
        for (let lng = bounds.west; lng < bounds.east; lng += gridSize) {
            const polygonBounds = [
                [lat, lng],
                [lat + gridSize, lng],
                [lat + gridSize, lng + gridSize],
                [lat, lng + gridSize]
            ];
            
            const weatherValue = generateWeatherValue(lat, lng, layerType);
            const color = getColorForValue(weatherValue, WEATHER_LAYERS[layerType].colorScale);
            
            if (color && color !== 'transparent') {
                const polygon = L.polygon(polygonBounds, {
                    fillColor: color,
                    fillOpacity: 0.6,
                    color: color,
                    weight: 0,
                    className: 'weather-polygon'
                });
                
                // Add popup with weather data
                polygon.bindPopup(`
                    <strong>${WEATHER_LAYERS[layerType].name}</strong><br>
                    Value: ${weatherValue.toFixed(1)} ${WEATHER_LAYERS[layerType].unit}<br>
                    Location: ${lat.toFixed(2)}, ${lng.toFixed(2)}
                `);
                
                polygonGroup.addLayer(polygon);
                polygonCount++;
            }
        }
    }
    
    console.log(`Created ${polygonCount} polygons for ${layerType} layer`);
    return polygonGroup;
}

function generateWeatherValue(lat, lng, layerType) {
    switch(layerType) {
        case 'wind':
            return generateWindValue(lat, lng);
        case 'temperature':
            return generateTemperatureValue(lat, lng);
        case 'precipitation':
            return generatePrecipitationValue(lat, lng);
        case 'solar':
            return generateSolarValue(lat, lng);
        default:
            return 0;
    }
}

function generateWindValue(lat, lng) {
    let windSpeed = 5; // Base wind speed
    
    // Scottish Highlands - higher winds
    if (lat > 56) windSpeed += 4;
    
    // Offshore areas - much higher winds
    if (lng > 1 || lng < -4) windSpeed += 6;
    
    // Western coastal areas - Atlantic influence
    if (lng < -2) windSpeed += 3;
    
    // Pennines effect
    if (lat > 53 && lat < 55 && lng > -3 && lng < -1) windSpeed += 2;
    
    // Add realistic variation
    windSpeed += (Math.random() - 0.5) * 4;
    return Math.max(0, Math.min(25, windSpeed));
}

function generateTemperatureValue(lat, lng) {
    // Base temperature decreases with latitude
    let temp = 18 - (lat - 50) * 0.8;
    
    // Urban heat islands
    if ((lat > 51.3 && lat < 51.7 && lng > -0.5 && lng < 0.3) || // London
        (lat > 53.3 && lat < 53.6 && lng > -2.4 && lng < -2.0)) { // Manchester
        temp += 3;
    }
    
    // Coastal moderating effect
    if (Math.abs(lng) > 2 || lng > 1) temp += 1;
    
    // Scottish highlands - colder
    if (lat > 56 && lng < -3) temp -= 3;
    
    // Add variation
    temp += (Math.random() - 0.5) * 6;
    return Math.max(-5, Math.min(30, temp));
}

function generatePrecipitationValue(lat, lng) {
    // Base precipitation - higher in west
    let precip = Math.max(0, 3 - lng * 0.5);
    
    // Scottish Highlands - orographic effect
    if (lat > 56 && lng < -3) precip += 4;
    
    // Welsh mountains
    if (lat > 51 && lat < 53 && lng < -3) precip += 3;
    
    // Lake District
    if (lat > 54 && lat < 55 && lng > -3.5 && lng < -2.5) precip += 2;
    
    // Eastern areas drier
    if (lng > 0) precip *= 0.6;
    
    // Add weather fronts
    if (Math.random() < 0.3) precip += Math.random() * 4;
    
    return Math.max(0, Math.min(20, precip));
}

function generateSolarValue(lat, lng) {
    // Base solar increases towards south
    let solar = 2.5 + (53 - lat) * 0.3;
    
    // East Anglia - particularly good solar
    if (lat > 52 && lat < 53.5 && lng > 0 && lng < 2) solar += 1.5;
    
    // South England bonus
    if (lat < 52) solar += 1;
    
    // Reduce for cloudy western areas
    if (lng < -2) solar -= 1;
    
    // Scottish penalty
    if (lat > 56) solar -= 1.5;
    
    // Add variation
    solar += (Math.random() - 0.5) * 1.5;
    return Math.max(0, Math.min(8, solar));
}

function getColorForValue(value, colorScale) {
    for (let i = 0; i < colorScale.length; i++) {
        const scale = colorScale[i];
        if (value >= scale.min && value <= scale.max) {
            return scale.color;
        }
    }
    return colorScale[colorScale.length - 1]?.color || 'transparent';
}

function removeWeatherLayer(layerType) {
    if (weatherLayers[layerType]) {
        map.removeLayer(weatherLayers[layerType]);
        delete weatherLayers[layerType];
        console.log('Removed weather layer:', layerType);
    }
}

function updateLayerOpacity(layerType, opacity) {
    if (weatherLayers[layerType]) {
        weatherLayers[layerType].eachLayer(function(layer) {
            layer.setStyle({ fillOpacity: opacity, opacity: opacity });
        });
    }
}

function updateOpacityDisplay(sliderId, value) {
    const slider = document.getElementById(sliderId);
    if (slider) {
        const display = slider.parentElement.querySelector('.opacity-value');
        if (display) {
            display.textContent = `${value}%`;
        }
    }
}

function updateLayerStatus(statusId, isActive) {
    const statusEl = document.getElementById(statusId);
    if (statusEl) {
        statusEl.textContent = isActive ? 'ON' : 'OFF';
        statusEl.className = isActive ? 'layer-status on' : 'layer-status';
    }
}

function updateLayerItemStyle(layerItem, isActive) {
    if (layerItem) {
        if (isActive) {
            layerItem.classList.add('active');
        } else {
            layerItem.classList.remove('active');
        }
    }
}

// Weather Legends
function populateWeatherLegends() {
    const legendsContainer = document.querySelector('.legends-container');
    if (!legendsContainer) return;
    
    Object.entries(WEATHER_LAYERS).forEach(([layerType, config]) => {
        const legendDiv = document.createElement('div');
        legendDiv.className = 'weather-legend';
        legendDiv.id = `legend-${layerType}`;
        
        const titleDiv = document.createElement('div');
        titleDiv.className = 'legend-title';
        titleDiv.textContent = `${config.name} (${config.unit})`;
        
        const scaleDiv = document.createElement('div');
        scaleDiv.className = 'legend-scale';
        
        config.colorScale.forEach(scale => {
            if (scale.color !== 'transparent') {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'legend-scale-item';
                
                itemDiv.innerHTML = `
                    <div class="legend-color" style="background-color: ${scale.color}"></div>
                    <div class="legend-label">${scale.label}</div>
                `;
                
                scaleDiv.appendChild(itemDiv);
            }
        });
        
        legendDiv.appendChild(titleDiv);
        legendDiv.appendChild(scaleDiv);
        legendsContainer.appendChild(legendDiv);
    });
}

function showWeatherLegend(layerType) {
    const legend = document.getElementById(`legend-${layerType}`);
    if (legend) {
        legend.classList.add('active');
    }
}

function hideWeatherLegend(layerType) {
    const legend = document.getElementById(`legend-${layerType}`);
    if (legend) {
        legend.classList.remove('active');
    }
}

// Map Click Handler for Weather Data
function handleMapClick(e) {
    if (weatherMarker) {
        map.removeLayer(weatherMarker);
    }
    
    const lat = e.latlng.lat.toFixed(4);
    const lng = e.latlng.lng.toFixed(4);
    
    // Add weather marker
    weatherMarker = L.circleMarker([lat, lng], {
        radius: 10,
        fillColor: '#1FB8CD',
        color: '#fff',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.8
    }).addTo(map);
    
    // Get weather data for this location
    getWeatherDataForLocation(lat, lng);
}

// Get Weather Data for Specific Location
function getWeatherDataForLocation(lat, lng) {
    console.log('Getting weather data for location:', lat, lng);
    
    try {
        const mockWeatherData = {
            wind: generateWindValue(parseFloat(lat), parseFloat(lng)),
            temperature: generateTemperatureValue(parseFloat(lat), parseFloat(lng)),
            precipitation: generatePrecipitationValue(parseFloat(lat), parseFloat(lng)),
            solar: generateSolarValue(parseFloat(lat), parseFloat(lng))
        };
        
        displayLocationWeather(mockWeatherData, lat, lng);
        showToast('Weather data loaded for selected location', 'success');
        
    } catch (error) {
        console.error('Error generating weather data:', error);
        showToast('Failed to generate weather data', 'error');
    }
}

function displayLocationWeather(weatherData, lat, lng) {
    const weatherInfo = document.getElementById('weatherInfo');
    if (!weatherInfo) return;
    
    weatherInfo.innerHTML = `
        <p><small><strong>Location:</strong> ${lat}, ${lng}</small></p>
        <p><small><strong>Wind Speed:</strong> ${weatherData.wind.toFixed(1)} m/s</small></p>
        <p><small><strong>Temperature:</strong> ${weatherData.temperature.toFixed(1)}°C</small></p>
        <p><small><strong>Precipitation:</strong> ${weatherData.precipitation.toFixed(1)} mm/h</small></p>
        <p><small><strong>Solar:</strong> ${weatherData.solar.toFixed(1)} kWh/m²/day</small></p>
    `;
}

// Enable Location Selection Mode
function enableLocationSelection() {
    showToast('Click on the map to get weather data at that location', 'info');
    
    const btn = document.getElementById('getLocationDataBtn');
    if (btn) {
        btn.textContent = 'Click map for weather data';
        btn.classList.add('btn--primary');
        btn.classList.remove('btn--secondary');
        
        setTimeout(() => {
            btn.textContent = 'Get Weather at Location';
            btn.classList.remove('btn--primary');
            btn.classList.add('btn--secondary');
        }, 5000);
    }
}

// Refresh Weather Data
function refreshWeatherData() {
    console.log('Refreshing weather data...');
    showLoading();
    
    // Get currently active layers
    const activeLayers = Object.keys(weatherLayers);
    
    // Remove all weather layers
    activeLayers.forEach(layerType => {
        removeWeatherLayer(layerType);
    });
    
    // Reload active layers with delay for visual feedback
    activeLayers.forEach((layerType, index) => {
        setTimeout(() => {
            loadWeatherLayer(layerType);
        }, index * 300);
    });
    
    updateLastUpdated();
    hideLoading();
    showToast('Weather data refreshed', 'success');
}

function refreshAllWeatherLayers() {
    console.log('Refreshing all weather layers...');
    refreshWeatherData();
}

function hideMapInfoOverlay() {
    const overlay = document.querySelector('.map-info-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function updateLastUpdated() {
    const lastUpdatedEl = document.getElementById('lastUpdated');
    if (lastUpdatedEl) {
        lastUpdatedEl.textContent = new Date().toLocaleTimeString();
    }
    lastWeatherUpdate = new Date();
}

// Filter and Search Functions
function populateFilters() {
    console.log('Populating filters...');
    
    // Technology filters
    const technologyContainer = document.getElementById('technologyFilters');
    if (technologyContainer) {
        technologies.forEach(tech => {
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="checkbox" value="${tech.id}" checked>
                <span>${tech.name}</span>
            `;
            label.addEventListener('change', applyFilters);
            technologyContainer.appendChild(label);
        });
    }
    
    // Company filter
    const companySelect = document.getElementById('companyFilter');
    if (companySelect) {
        companies.forEach(company => {
            const option = document.createElement('option');
            option.value = company;
            option.textContent = company;
            companySelect.appendChild(option);
        });
    }
    
    console.log('Filters populated');
}

function populateLegend() {
    console.log('Populating legend...');
    
    const legendContainer = document.getElementById('technologyLegend');
    if (legendContainer) {
        technologies.forEach(tech => {
            const item = document.createElement('div');
            item.className = 'legend-item';
            item.innerHTML = `
                <div class="legend-icon" style="background-color: ${tech.color}">
                    ${tech.icon}
                </div>
                <span>${tech.name}</span>
            `;
            legendContainer.appendChild(item);
        });
    }
    
    console.log('Legend populated');
}

// Trial Management
function createCustomMarker(trial) {
    const tech = technologies.find(t => t.id === trial.technology);
    if (!tech) {
        console.warn('Technology not found for trial:', trial.technology);
        return null;
    }
    
    const icon = L.divIcon({
        html: `<div class="custom-marker marker-${trial.status}" style="background-color: ${tech.color}; width: 32px; height: 32px;">${tech.icon}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
        className: 'custom-div-icon'
    });
    
    const marker = L.marker([trial.lat, trial.lng], { icon })
        .bindTooltip(`<strong>${trial.name}</strong><br>${trial.company}<br>Status: ${trial.status}`, {
            direction: 'top',
            offset: [0, -10]
        })
        .on('click', () => {
            console.log('Marker clicked:', trial.name);
            showTrialDetails(trial);
        });
    
    return marker;
}

function updateTrialMarkers() {
    console.log('Updating trial markers...');
    
    // Clear existing markers
    markers.forEach(marker => {
        if (map.hasLayer(marker)) {
            map.removeLayer(marker);
        }
    });
    markers = [];
    
    // Get current filters
    const enabledTechnologies = Array.from(document.querySelectorAll('#technologyFilters input:checked')).map(cb => cb.value);
    const selectedCompany = document.getElementById('companyFilter')?.value || '';
    const selectedStatus = document.getElementById('statusFilter')?.value || '';
    
    console.log('Applied filters:', { enabledTechnologies, selectedCompany, selectedStatus });
    
    // Filter trials
    filteredTrials = fieldTrials.filter(trial => {
        const techMatch = enabledTechnologies.length === 0 || enabledTechnologies.includes(trial.technology);
        const companyMatch = !selectedCompany || trial.company === selectedCompany;
        const statusMatch = !selectedStatus || trial.status === selectedStatus;
        return techMatch && companyMatch && statusMatch;
    });
    
    console.log('Filtered trials count:', filteredTrials.length);
    
    // Add filtered markers
    filteredTrials.forEach(trial => {
        const marker = createCustomMarker(trial);
        if (marker) {
            marker.addTo(map);
            markers.push(marker);
        }
    });
    
    console.log('Markers updated, total visible:', markers.length);
}

function applyFilters() {
    console.log('Applying filters...');
    updateTrialMarkers();
    showToast(`Filtered to ${filteredTrials.length} trials`, 'success');
}

function clearAllFilters() {
    console.log('Clearing all filters...');
    
    // Reset technology checkboxes
    document.querySelectorAll('#technologyFilters input[type="checkbox"]').forEach(cb => {
        cb.checked = true;
    });
    
    // Reset dropdowns
    const companyFilter = document.getElementById('companyFilter');
    const statusFilter = document.getElementById('statusFilter');
    const searchInput = document.getElementById('searchInput');
    
    if (companyFilter) companyFilter.value = '';
    if (statusFilter) statusFilter.value = '';
    if (searchInput) searchInput.value = '';
    
    applyFilters();
}

function switchBaseMap(mapType) {
    console.log('Switching base map to:', mapType);
    
    Object.values(baseLayers).forEach(layer => {
        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
        }
    });
    
    switch(mapType) {
        case 'satellite':
            baseLayers.satellite.addTo(map);
            break;
        case 'terrain':
            baseLayers.terrain.addTo(map);
            break;
        default:
            baseLayers.street.addTo(map);
    }
}

// Trial Details Display
function showTrialDetails(trial) {
    console.log('Showing trial details for:', trial.name);
    
    const tech = technologies.find(t => t.id === trial.technology);
    if (!tech) {
        console.error('Technology not found for trial:', trial.technology);
        return;
    }
    
    // Get current weather for trial location
    let currentWeatherHtml = '';
    try {
        const mockWeatherData = {
            wind: generateWindValue(trial.lat, trial.lng),
            temperature: generateTemperatureValue(trial.lat, trial.lng),
            precipitation: generatePrecipitationValue(trial.lat, trial.lng),
            solar: generateSolarValue(trial.lat, trial.lng)
        };
        
        currentWeatherHtml = `
            <div class="current-weather">
                <h4>Current Weather Conditions</h4>
                <div class="weather-grid">
                    <div class="weather-metric">
                        <div class="weather-metric-label">Wind Speed</div>
                        <div class="weather-metric-value">${mockWeatherData.wind.toFixed(1)} m/s</div>
                    </div>
                    <div class="weather-metric">
                        <div class="weather-metric-label">Temperature</div>
                        <div class="weather-metric-value">${mockWeatherData.temperature.toFixed(1)}°C</div>
                    </div>
                    <div class="weather-metric">
                        <div class="weather-metric-label">Precipitation</div>
                        <div class="weather-metric-value">${mockWeatherData.precipitation.toFixed(1)} mm/h</div>
                    </div>
                    <div class="weather-metric">
                        <div class="weather-metric-label">Solar</div>
                        <div class="weather-metric-value">${mockWeatherData.solar.toFixed(1)} kWh/m²</div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.warn('Could not generate current weather for trial location:', error);
    }
    
    const detailsHtml = `
        <div class="trial-header">
            <div class="trial-icon" style="background-color: ${tech.color}">
                ${tech.icon}
            </div>
            <div class="trial-title">
                <h2>${trial.name}</h2>
                <div class="company">${trial.company}</div>
            </div>
        </div>
        
        <div class="trial-metrics">
            <div class="metric-item">
                <div class="metric-label">Status</div>
                <div class="metric-value">${trial.status.charAt(0).toUpperCase() + trial.status.slice(1)}</div>
            </div>
            <div class="metric-item">
                <div class="metric-label">Capacity</div>
                <div class="metric-value">${trial.capacity}</div>
            </div>
            <div class="metric-item">
                <div class="metric-label">Technology</div>
                <div class="metric-value">${tech.name}</div>
            </div>
            <div class="metric-item">
                <div class="metric-label">Location</div>
                <div class="metric-value">${trial.lat.toFixed(3)}, ${trial.lng.toFixed(3)}</div>
            </div>
        </div>
        
        <div class="trial-section">
            <h3>Description</h3>
            <p>${trial.description}</p>
        </div>
        
        <div class="trial-section">
            <h3>Location Rationale</h3>
            <p>${trial.locationRationale}</p>
        </div>
        
        <div class="trial-section">
            <h3>Performance</h3>
            <div class="environmental-data">
                ${Object.entries(trial.performance).map(([key, value]) => `
                    <div class="env-item">
                        <span class="env-label">${formatEnvLabel(key)}</span>
                        <span class="env-value">${value}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="trial-section">
            <h3>Environmental Conditions</h3>
            <div class="environmental-data">
                ${Object.entries(trial.environmental).map(([key, value]) => `
                    <div class="env-item">
                        <span class="env-label">${formatEnvLabel(key)}</span>
                        <span class="env-value">${value}</span>
                    </div>
                `).join('')}
            </div>
            ${currentWeatherHtml}
        </div>
    `;
    
    checkMobileLayout();
    
    if (isMobile) {
        const mobileDetails = document.getElementById('mobileTrialDetails');
        const mobileSheet = document.getElementById('mobileBottomSheet');
        if (mobileDetails && mobileSheet) {
            mobileDetails.innerHTML = detailsHtml;
            mobileSheet.classList.add('active');
        }
    } else {
        const trialDetails = document.getElementById('trialDetails');
        const rightSidebar = document.getElementById('rightSidebar');
        if (trialDetails && rightSidebar) {
            trialDetails.innerHTML = detailsHtml;
            rightSidebar.classList.add('active');
        }
    }
}

// Utility Functions
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase().trim();
    console.log('Performing search for:', query);
    
    if (!query) {
        showToast('Please enter a search term', 'error');
        return;
    }
    
    const matchedTrial = fieldTrials.find(trial => 
        trial.name.toLowerCase().includes(query) ||
        trial.company.toLowerCase().includes(query) ||
        trial.id.toLowerCase().includes(query)
    );
    
    if (matchedTrial) {
        map.setView([matchedTrial.lat, matchedTrial.lng], 10);
        setTimeout(() => {
            showTrialDetails(matchedTrial);
        }, 500);
        showToast(`Found: ${matchedTrial.name}`, 'success');
    } else {
        showToast('No matching trials found', 'error');
    }
}

function exportData() {
    console.log('Exporting data...');
    
    const dataToExport = {
        trials: filteredTrials,
        exportDate: new Date().toISOString(),
        totalTrials: filteredTrials.length,
        lastWeatherUpdate: lastWeatherUpdate ? lastWeatherUpdate.toISOString() : null,
        activeWeatherLayers: Object.keys(weatherLayers),
        filters: {
            technologies: Array.from(document.querySelectorAll('#technologyFilters input:checked')).map(cb => cb.value),
            company: document.getElementById('companyFilter')?.value || '',
            status: document.getElementById('statusFilter')?.value || ''
        }
    };
    
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `field-trials-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast('Data exported successfully', 'success');
}

function closeSidebarPanel() {
    const rightSidebar = document.getElementById('rightSidebar');
    const mobileSheet = document.getElementById('mobileBottomSheet');
    
    if (rightSidebar) rightSidebar.classList.remove('active');
    if (mobileSheet) mobileSheet.classList.remove('active');
}

function toggleMobileMenu() {
    const leftSidebar = document.getElementById('leftSidebar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (leftSidebar) {
        leftSidebar.classList.toggle('active');
    }
    
    if (mobileMenuBtn) {
        mobileMenuBtn.classList.toggle('active');
    }
}

function formatEnvLabel(key) {
    return key.replace(/([A-Z])/g, ' $1')
              .toLowerCase()
              .replace(/^./, str => str.toUpperCase());
}

function checkMobileLayout() {
    isMobile = window.innerWidth <= 768;
}

function showLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('active');
    }
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('active');
    }
}

function showToast(message, type = 'info') {
    console.log('Showing toast:', message, type);
    
    const toast = document.getElementById('toast');
    const messageEl = document.getElementById('toastMessage');
    
    if (toast && messageEl) {
        messageEl.textContent = message;
        toast.className = `toast active ${type}`;
        
        // Clear any existing timeout
        if (toast._timeout) {
            clearTimeout(toast._timeout);
        }
        
        // Set new timeout
        toast._timeout = setTimeout(() => {
            hideToast();
        }, 4000);
    }
}

function hideToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.remove('active', 'success', 'error', 'info');
        if (toast._timeout) {
            clearTimeout(toast._timeout);
            delete toast._timeout;
        }
    }
}

function handleResponsiveChanges() {
    console.log('Handling responsive changes, isMobile:', isMobile);
    
    if (isMobile) {
        const rightSidebar = document.getElementById('rightSidebar');
        const leftSidebar = document.getElementById('leftSidebar');
        if (rightSidebar) rightSidebar.classList.remove('active');
        if (leftSidebar) leftSidebar.classList.remove('active');
    } else {
        const mobileSheet = document.getElementById('mobileBottomSheet');
        if (mobileSheet) mobileSheet.classList.remove('active');
    }
}
