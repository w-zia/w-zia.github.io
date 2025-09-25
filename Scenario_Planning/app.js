// UK Wind Farm Planning Tool - Fixed Progressive Loading Implementation

// Global variables
let map;
let layerGroups = {
    windFarms: null,
    gridLines: null,
    protectedAreas: null,
    aviationConstraints: null
};

// Data loading state tracking
let loadingState = {
    initialProjects: true,
    moreProjects: false,
    gridData: false,
    protectedAreas: false,
    aviationConstraints: false,
    fullDatabase: false
};

// Statistics tracking
let stats = {
    totalProjects: 15,
    totalCapacity: 8547,
    activeLayers: 3
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    loadInitialData();
    setupEventListeners();
});

// Initialize Leaflet map
function initializeMap() {
    map = L.map('map', {
        zoomControl: true,
        preferCanvas: false
    }).setView([55.0, -3.0], 6);

    // Add base tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Initialize layer groups
    layerGroups.windFarms = L.markerClusterGroup({
        chunkedLoading: true,
        chunkProgress: function(processed, total) {
            console.log('Loading markers: ' + processed + ' of ' + total);
        }
    });
    
    layerGroups.gridLines = L.layerGroup();
    layerGroups.protectedAreas = L.layerGroup();  
    layerGroups.aviationConstraints = L.layerGroup();

    // Add initial layer groups to map
    map.addLayer(layerGroups.windFarms);
    map.addLayer(layerGroups.gridLines);
    map.addLayer(layerGroups.protectedAreas);
    map.addLayer(layerGroups.aviationConstraints);
}

// Load initial essential data
function loadInitialData() {
    console.log('Loading initial essential projects...');
    
    // Get initial projects data from the provided JSON
    const initialProjects = [
        {id: "WF001", name: "Hornsea One", lat: 53.9, lng: 1.8, capacity: 1218, status: "operational", type: "offshore", developer: "Ørsted"},
        {id: "WF002", name: "Hornsea Two", lat: 53.8, lng: 1.9, capacity: 1386, status: "operational", type: "offshore", developer: "Ørsted"},
        {id: "WF003", name: "London Array", lat: 51.6, lng: 1.0, capacity: 630, status: "operational", type: "offshore", developer: "Ørsted"},
        {id: "WF004", name: "Whitelee", lat: 55.7, lng: -4.3, capacity: 539, status: "operational", type: "onshore", developer: "ScottishPower"},
        {id: "WF005", name: "Clyde Wind Farm", lat: 55.5, lng: -3.8, capacity: 522, status: "operational", type: "onshore", developer: "SSE"},
        {id: "WF006", name: "Greater Gabbard", lat: 51.9, lng: 2.0, capacity: 504, status: "operational", type: "offshore", developer: "SSE"},
        {id: "WF007", name: "Sheringham Shoal", lat: 53.0, lng: 1.2, capacity: 317, status: "operational", type: "offshore", developer: "Equinor"},
        {id: "WF008", name: "Thanet", lat: 51.4, lng: 1.6, capacity: 300, status: "operational", type: "offshore", developer: "Vattenfall"},
        {id: "WF009", name: "Beatrice", lat: 58.2, lng: -3.0, capacity: 588, status: "operational", type: "offshore", developer: "SSE"},
        {id: "WF010", name: "Robin Rigg", lat: 54.9, lng: -3.4, capacity: 180, status: "operational", type: "offshore", developer: "E.ON"},
        {id: "WF011", name: "Rampion", lat: 50.7, lng: -0.3, capacity: 400, status: "operational", type: "offshore", developer: "E.ON"},
        {id: "WF012", name: "Gwynt y Mor", lat: 53.4, lng: -3.7, capacity: 160, status: "operational", type: "offshore", developer: "RWE"},
        {id: "WF013", name: "West of Duddon Sands", lat: 54.1, lng: -3.3, capacity: 389, status: "operational", type: "offshore", developer: "Ørsted"},
        {id: "WF014", name: "Walney Extension", lat: 54.0, lng: -3.5, capacity: 659, status: "operational", type: "offshore", developer: "Ørsted"},
        {id: "WF015", name: "Race Bank", lat: 53.2, lng: 0.8, capacity: 573, status: "operational", type: "offshore", developer: "Ørsted"}
    ];

    // Add initial wind farm markers
    initialProjects.forEach(project => {
        const marker = createWindFarmMarker(project);
        layerGroups.windFarms.addLayer(marker);
    });

    // Add initial grid lines
    const initialGridLines = [
        {name: "Beauly-Denny", coords: [[57.4, -4.2], [56.8, -4.0], [56.2, -4.1]], voltage: "400kV", capacity: 2200},
        {name: "Western HVDC", coords: [[55.8, -4.3], [54.9, -3.1], [53.8, -2.2]], voltage: "400kV", capacity: 2250},
        {name: "Eastern Main", coords: [[55.9, -2.1], [54.8, -1.8], [53.7, -1.2]], voltage: "400kV", capacity: 1800}
    ];

    initialGridLines.forEach(line => {
        const polyline = L.polyline(line.coords, {
            color: '#ff0000',
            weight: 4,
            opacity: 0.8
        }).bindPopup(`<h4>${line.name}</h4><p><strong>Voltage:</strong> ${line.voltage}</p><p><strong>Capacity:</strong> ${line.capacity} MW</p>`);
        
        layerGroups.gridLines.addLayer(polyline);
    });

    // Add major substations
    const majorSubstations = [
        {name: "Beauly", lat: 57.45, lng: -4.22, voltage: "400kV", capacity: 2200},
        {name: "Denny", lat: 56.03, lng: -4.05, voltage: "400kV", capacity: 1800},
        {name: "Torness", lat: 55.97, lng: -2.41, voltage: "400kV", capacity: 1200},
        {name: "Drax", lat: 53.74, lng: -0.99, voltage: "400kV", capacity: 1200},
        {name: "Grain", lat: 51.45, lng: 0.71, voltage: "400kV", capacity: 1000}
    ];

    majorSubstations.forEach(sub => {
        const marker = createSubstationMarker(sub);
        layerGroups.gridLines.addLayer(marker);
    });

    updateStatistics();
    console.log('Initial data loaded successfully');
}

// Create wind farm marker with appropriate icon and popup
function createWindFarmMarker(project) {
    const iconColor = getWindFarmColor(project);
    const iconSize = project.type === 'offshore' ? [12, 12] : [10, 10];
    
    const icon = L.divIcon({
        className: 'wind-farm-marker',
        html: `<div style="background-color: ${iconColor}; width: ${iconSize[0]}px; height: ${iconSize[1]}px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 1px rgba(0,0,0,0.3);"></div>`,
        iconSize: iconSize,
        iconAnchor: [iconSize[0]/2, iconSize[1]/2]
    });

    const marker = L.marker([project.lat, project.lng], { icon: icon });
    
    const popupContent = `
        <div style="min-width: 200px;">
            <h4 style="margin: 0 0 8px 0; color: #21808d; font-size: 16px;">${project.name}</h4>
            <p style="margin: 4px 0;"><strong>Type:</strong> ${project.type} ${project.status}</p>
            <p style="margin: 4px 0;"><strong>Capacity:</strong> ${project.capacity} MW</p>
            <p style="margin: 4px 0;"><strong>Developer:</strong> ${project.developer}</p>
        </div>
    `;
    
    marker.bindPopup(popupContent);
    return marker;
}

// Create substation marker
function createSubstationMarker(substation) {
    const icon = L.divIcon({
        className: 'substation-marker',
        html: `<div style="background-color: #DB4545; width: 12px; height: 12px; border-radius: 2px; border: 2px solid white; box-shadow: 0 0 0 1px rgba(0,0,0,0.3);"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
    });

    const marker = L.marker([substation.lat, substation.lng], { icon: icon });
    
    const popupContent = `
        <div>
            <h4 style="margin: 0 0 8px 0; color: #21808d;">${substation.name} Substation</h4>
            <p style="margin: 4px 0;"><strong>Voltage:</strong> ${substation.voltage}</p>
            <p style="margin: 4px 0;"><strong>Capacity:</strong> ${substation.capacity} MW</p>
        </div>
    `;
    
    marker.bindPopup(popupContent);
    return marker;
}

// Get appropriate color for wind farm marker
function getWindFarmColor(project) {
    if (project.status === 'operational') {
        return project.type === 'offshore' ? '#1FB8CD' : '#5D878F';
    } else if (project.status === 'construction') {
        return '#FFC185';
    } else if (project.status === 'consented') {
        return '#B4413C';
    }
    return '#ECEBD5';
}

// Setup all event listeners
function setupEventListeners() {
    // Load More Projects button
    document.getElementById('loadMoreProjects').addEventListener('click', function() {
        if (!loadingState.moreProjects) {
            loadMoreProjects();
        }
    });

    // Load All Grid Data button  
    document.getElementById('loadAllGridData').addEventListener('click', function() {
        if (!loadingState.gridData) {
            loadAllGridData();
        }
    });

    // Load Protected Areas button
    document.getElementById('loadProtectedAreas').addEventListener('click', function() {
        if (!loadingState.protectedAreas) {
            loadProtectedAreas();
        }
    });

    // Load Aviation Constraints button
    document.getElementById('loadAviationConstraints').addEventListener('click', function() {
        if (!loadingState.aviationConstraints) {
            loadAviationConstraints();
        }
    });

    // Load Full Database button
    document.getElementById('loadFullDatabase').addEventListener('click', function() {
        if (!loadingState.fullDatabase) {
            loadFullDatabase();
        }
    });

    // Layer toggle checkboxes
    document.getElementById('toggleWindFarms').addEventListener('change', function(e) {
        toggleLayer(layerGroups.windFarms, e.target.checked);
    });

    document.getElementById('toggleGridLines').addEventListener('change', function(e) {
        toggleLayer(layerGroups.gridLines, e.target.checked);
    });

    document.getElementById('toggleProtected').addEventListener('change', function(e) {
        toggleLayer(layerGroups.protectedAreas, e.target.checked);
    });

    document.getElementById('toggleAviation').addEventListener('change', function(e) {
        toggleLayer(layerGroups.aviationConstraints, e.target.checked);
    });
}

// Load additional wind farm projects
function loadMoreProjects() {
    const btn = document.getElementById('loadMoreProjects');
    setButtonLoading(btn, true);
    
    setTimeout(() => {
        console.log('Loading additional wind farm projects...');
        
        // Additional projects data
        const additionalProjects = [
            {id: "WF016", name: "Dogger Bank A", lat: 54.7, lng: 2.3, capacity: 1200, status: "construction", type: "offshore", developer: "SSE/Equinor"},
            {id: "WF017", name: "Dogger Bank B", lat: 54.8, lng: 2.4, capacity: 1200, status: "construction", type: "offshore", developer: "SSE/Equinor"},
            {id: "WF018", name: "Dogger Bank C", lat: 54.9, lng: 2.5, capacity: 1200, status: "consented", type: "offshore", developer: "SSE/Equinor"},
            {id: "WF019", name: "Norfolk Boreas", lat: 52.8, lng: 1.4, capacity: 1800, status: "consented", type: "offshore", developer: "Vattenfall"},
            {id: "WF020", name: "Norfolk Vanguard", lat: 52.9, lng: 1.5, capacity: 1800, status: "consented", type: "offshore", developer: "Vattenfall"},
            {id: "WF021", name: "Hornsea Four", lat: 54.0, lng: 1.7, capacity: 2600, status: "consented", type: "offshore", developer: "Ørsted"},
            {id: "WF022", name: "Moray East", lat: 57.7, lng: -2.3, capacity: 950, status: "operational", type: "offshore", developer: "Ocean Winds"},
            {id: "WF023", name: "Triton Knoll", lat: 53.4, lng: 0.8, capacity: 857, status: "operational", type: "offshore", developer: "RWE"},
            {id: "WF024", name: "Burbo Bank Extension", lat: 53.5, lng: -3.2, capacity: 259, status: "operational", type: "offshore", developer: "Ørsted"},
            {id: "WF025", name: "Westermost Rough", lat: 53.8, lng: 0.1, capacity: 210, status: "operational", type: "offshore", developer: "Ørsted"},
            {id: "WF031", name: "Crystal Rig", lat: 55.8, lng: -2.6, capacity: 138, status: "operational", type: "onshore", developer: "Fred Olsen"},
            {id: "WF032", name: "Fallago Rig", lat: 55.6, lng: -2.7, capacity: 144, status: "operational", type: "onshore", developer: "EDF"},
            {id: "WF033", name: "Blacklaw", lat: 55.7, lng: -3.6, capacity: 97, status: "operational", type: "onshore", developer: "ScottishPower"},
            {id: "WF034", name: "Hagshaw Hill", lat: 55.5, lng: -3.9, capacity: 156, status: "operational", type: "onshore", developer: "ScottishPower"},
            {id: "WF035", name: "Beinn an Tuirc", lat: 55.7, lng: -5.4, capacity: 46, status: "operational", type: "onshore", developer: "SSE"}
        ];

        // Add the new markers
        additionalProjects.forEach(project => {
            const marker = createWindFarmMarker(project);
            layerGroups.windFarms.addLayer(marker);
        });

        // Update statistics
        stats.totalProjects += additionalProjects.length;
        stats.totalCapacity += additionalProjects.reduce((sum, p) => sum + p.capacity, 0);
        
        // Mark as loaded
        loadingState.moreProjects = true;
        setButtonLoaded(btn);
        
        // Update UI
        document.getElementById('projectCount').textContent = `${stats.totalProjects} loaded`;
        updateStatistics();
        showToast('✅ Additional wind farm projects loaded successfully!');
        
        console.log('Additional projects loaded successfully');
    }, 800);
}

// Load all grid data
function loadAllGridData() {
    const btn = document.getElementById('loadAllGridData');
    setButtonLoading(btn, true);
    
    setTimeout(() => {
        console.log('Loading additional grid infrastructure...');
        
        // Additional grid lines
        const additionalGridLines = [
            {name: "Scottish South 275kV", coords: [[55.8, -4.1], [55.2, -3.8], [54.7, -3.2]], voltage: "275kV", capacity: 1200},
            {name: "Pennine Crossing", coords: [[54.5, -2.8], [53.9, -2.1], [53.2, -1.8]], voltage: "275kV", capacity: 800},
            {name: "Welsh Connection", coords: [[53.1, -4.2], [52.5, -3.8], [51.9, -3.2]], voltage: "275kV", capacity: 600},
            {name: "Yorkshire Grid", coords: [[54.2, -1.5], [53.8, -1.2], [53.4, -0.9]], voltage: "132kV", capacity: 400},
            {name: "Scottish Highlands", coords: [[57.2, -4.5], [56.8, -4.1], [56.4, -3.7]], voltage: "132kV", capacity: 300},
            {name: "East Anglia", coords: [[52.8, 1.2], [52.4, 0.8], [52.0, 0.4]], voltage: "132kV", capacity: 350}
        ];

        additionalGridLines.forEach(line => {
            let color, weight;
            if (line.voltage === '275kV') {
                color = '#0066ff';
                weight = 3;
            } else if (line.voltage === '132kV') {
                color = '#00cc00';
                weight = 2;
            } else {
                color = '#ff0000';
                weight = 4;
            }
            
            const polyline = L.polyline(line.coords, {
                color: color,
                weight: weight,
                opacity: 0.7
            }).bindPopup(`<h4>${line.name}</h4><p><strong>Voltage:</strong> ${line.voltage}</p><p><strong>Capacity:</strong> ${line.capacity} MW</p>`);
            
            layerGroups.gridLines.addLayer(polyline);
        });

        // Additional substations
        const additionalSubstations = [
            {name: "Peterhead", lat: 57.50, lng: -1.78, voltage: "275kV", capacity: 800},
            {name: "Eccles", lat: 55.62, lng: -4.76, voltage: "275kV", capacity: 600},
            {name: "Harker", lat: 54.93, lng: -2.88, voltage: "275kV", capacity: 400},
            {name: "Bramford", lat: 52.07, lng: 1.09, voltage: "400kV", capacity: 900},
            {name: "Sellindge", lat: 51.10, lng: 0.95, voltage: "275kV", capacity: 500}
        ];

        additionalSubstations.forEach(sub => {
            const marker = createSubstationMarker(sub);
            layerGroups.gridLines.addLayer(marker);
        });

        // Mark as loaded
        loadingState.gridData = true;
        setButtonLoaded(btn);
        
        // Update UI
        const totalGridItems = 3 + additionalGridLines.length + additionalSubstations.length;
        document.getElementById('gridCount').textContent = `${totalGridItems} items loaded`;
        updateStatistics();
        showToast('⚡ Additional grid infrastructure loaded successfully!');
        
        console.log('Grid data loaded successfully');
    }, 700);
}

// Load protected areas
function loadProtectedAreas() {
    const btn = document.getElementById('loadProtectedAreas');
    setButtonLoading(btn, true);
    
    setTimeout(() => {
        console.log('Loading protected areas...');
        
        const protectedAreas = [
            {name: "Cairngorms National Park", bounds: [[56.8, -3.8], [57.2, -3.0], [57.0, -2.5], [56.5, -2.8]], type: "National Park"},
            {name: "Yorkshire Dales National Park", bounds: [[54.0, -2.6], [54.4, -2.0], [54.2, -1.8], [53.8, -2.4]], type: "National Park"},
            {name: "Lake District National Park", bounds: [[54.6, -3.4], [54.7, -2.9], [54.3, -2.8], [54.2, -3.5]], type: "National Park"},
            {name: "Flamborough Coast SPA", bounds: [[54.12, -0.35], [54.15, -0.12], [54.05, -0.08], [54.02, -0.31]], type: "Special Protection Area"},
            {name: "Tayside Goose Roosts SPA", bounds: [[56.4, -3.2], [56.6, -2.8], [56.3, -2.6], [56.1, -3.0]], type: "Special Protection Area"},
            {name: "Dogger Bank SAC", bounds: [[54.0, 1.0], [55.5, 3.0], [56.0, 2.5], [54.5, 0.5]], type: "Special Area of Conservation"},
            {name: "Berwickshire SAC", bounds: [[55.9, -2.2], [56.1, -1.8], [55.8, -1.6], [55.6, -2.0]], type: "Special Area of Conservation"}
        ];

        protectedAreas.forEach(area => {
            const polygon = L.polygon(area.bounds, {
                color: '#228b22',
                fillColor: '#90ee90',
                fillOpacity: 0.4,
                weight: 2,
                opacity: 0.8
            }).bindPopup(`<h4>${area.name}</h4><p><strong>Type:</strong> ${area.type}</p><p>Environmental protection zone with development restrictions.</p>`);
            
            layerGroups.protectedAreas.addLayer(polygon);
        });

        // Mark as loaded
        loadingState.protectedAreas = true;
        setButtonLoaded(btn);
        
        // Update UI
        document.getElementById('envCount').textContent = `${protectedAreas.length} areas loaded`;
        updateStatistics();
        showToast('🌿 Protected areas loaded successfully!');
        
        console.log('Protected areas loaded successfully');
    }, 600);
}

// Load aviation constraints
function loadAviationConstraints() {
    const btn = document.getElementById('loadAviationConstraints');
    setButtonLoading(btn, true);
    
    setTimeout(() => {
        console.log('Loading aviation constraints...');
        
        const aviationConstraints = [
            {name: "RAF Fylingdales Radar", lat: 54.36, lng: -0.67, radius: 74, type: "Early Warning Radar"},
            {name: "RAF Buchan", lat: 57.67, lng: -1.87, radius: 30, type: "Air Traffic Control"},
            {name: "Edinburgh Airport", lat: 55.95, lng: -3.37, radius: 15, type: "Commercial Airport"},
            {name: "Glasgow Airport", lat: 55.87, lng: -4.43, radius: 15, type: "Commercial Airport"},
            {name: "Low Flying Area 7", bounds: [[55.5, -3.0], [55.8, -2.8], [55.6, -2.5], [55.3, -2.7]], type: "Military Training"}
        ];

        aviationConstraints.forEach(constraint => {
            if (constraint.radius) {
                const circle = L.circle([constraint.lat, constraint.lng], {
                    radius: constraint.radius * 1000,
                    color: '#dc143c',
                    fillColor: '#ff6b6b',
                    fillOpacity: 0.3,
                    weight: 2,
                    opacity: 0.8
                }).bindPopup(`<h4>${constraint.name}</h4><p><strong>Type:</strong> ${constraint.type}</p><p><strong>Radius:</strong> ${constraint.radius}km exclusion zone</p>`);
                
                layerGroups.aviationConstraints.addLayer(circle);
            } else if (constraint.bounds) {
                const polygon = L.polygon(constraint.bounds, {
                    color: '#ff4500',
                    fillColor: '#ffa500',
                    fillOpacity: 0.3,
                    weight: 2,
                    opacity: 0.8
                }).bindPopup(`<h4>${constraint.name}</h4><p><strong>Type:</strong> ${constraint.type}</p><p>Military training area with height restrictions.</p>`);
                
                layerGroups.aviationConstraints.addLayer(polygon);
            }
        });

        // Mark as loaded
        loadingState.aviationConstraints = true;
        setButtonLoaded(btn);
        
        // Update UI
        document.getElementById('aviationCount').textContent = `${aviationConstraints.length} zones loaded`;
        updateStatistics();
        showToast('✈️ Aviation constraints loaded successfully!');
        
        console.log('Aviation constraints loaded successfully');
    }, 500);
}

// Load full database (all remaining data)
function loadFullDatabase() {
    const btn = document.getElementById('loadFullDatabase');
    setButtonLoading(btn, true);
    
    setTimeout(() => {
        console.log('Loading full database...');
        
        // Load any remaining data that hasn't been loaded yet
        const promises = [];
        
        if (!loadingState.moreProjects) {
            promises.push(new Promise(resolve => {
                loadMoreProjects();
                setTimeout(resolve, 900);
            }));
        }
        if (!loadingState.gridData) {
            promises.push(new Promise(resolve => {
                loadAllGridData();
                setTimeout(resolve, 800);
            }));
        }
        if (!loadingState.protectedAreas) {
            promises.push(new Promise(resolve => {
                loadProtectedAreas();
                setTimeout(resolve, 700);
            }));
        }
        if (!loadingState.aviationConstraints) {
            promises.push(new Promise(resolve => {
                loadAviationConstraints();
                setTimeout(resolve, 600);
            }));
        }

        // Wait for all to complete
        Promise.all(promises).then(() => {
            // Mark as loaded
            loadingState.fullDatabase = true;
            setButtonLoaded(btn);
            
            showToast('🗄️ Full database loaded successfully!');
            console.log('Full database loaded successfully');
        });
    }, 300);
}

// Button loading state management
function setButtonLoading(btn, loading) {
    if (loading) {
        btn.classList.add('loading');
        btn.disabled = true;
        const icon = btn.querySelector('.btn-icon');
        if (icon) {
            icon.textContent = '⟲';
        }
        const text = btn.querySelector('.btn-text');
        if (text) {
            text.textContent = 'Loading...';
        }
    } else {
        btn.classList.remove('loading');
        btn.disabled = false;
    }
}

function setButtonLoaded(btn) {
    // First remove loading state
    setButtonLoading(btn, false);
    
    // Then set loaded state
    btn.classList.add('loaded');
    const icon = btn.querySelector('.btn-icon');
    if (icon) {
        icon.textContent = '✅';
    }
    const text = btn.querySelector('.btn-text');
    if (text) {
        text.textContent = 'Loaded';
    }
    const count = btn.querySelector('.btn-count');
    if (count) {
        count.textContent = '(Complete)';
    }
}

// Toggle layer visibility
function toggleLayer(layerGroup, visible) {
    if (visible) {
        if (!map.hasLayer(layerGroup)) {
            map.addLayer(layerGroup);
        }
    } else {
        if (map.hasLayer(layerGroup)) {
            map.removeLayer(layerGroup);
        }
    }
    updateStatistics();
}

// Update statistics display
function updateStatistics() {
    document.getElementById('totalProjects').textContent = stats.totalProjects;
    document.getElementById('totalCapacity').textContent = stats.totalCapacity.toLocaleString();
    
    // Count active layers
    let activeLayers = 0;
    if (map.hasLayer(layerGroups.windFarms)) activeLayers++;
    if (map.hasLayer(layerGroups.gridLines)) activeLayers++;
    if (map.hasLayer(layerGroups.protectedAreas)) activeLayers++;
    if (map.hasLayer(layerGroups.aviationConstraints)) activeLayers++;
    
    stats.activeLayers = activeLayers;
    document.getElementById('activeLayers').textContent = activeLayers;
}

// Show status toast
function showToast(message) {
    const toast = document.getElementById('statusToast');
    const messageSpan = toast.querySelector('.toast-message');
    
    messageSpan.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }, 3000);
}

console.log('Wind Farm Planning Tool initialized successfully');
