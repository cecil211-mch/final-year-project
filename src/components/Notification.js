import React, { useState, useEffect } from 'react';
import { Bell, Droplets, Beaker, Thermometer, Eye, Activity, AlertTriangle, CheckCircle, TrendingUp, Wifi } from 'lucide-react';
import './Notification.css';

// Mock Data (Replace with Firebase integration later)
const mockSensorData = {
  nitrogen: { value: 45, unit: 'ppm', status: 'normal', lastUpdate: '2 mins ago' },
  phosphorus: { value: 32, unit: 'ppm', status: 'low', lastUpdate: '2 mins ago' },
  potassium: { value: 28, unit: 'ppm', status: 'normal', lastUpdate: '2 mins ago' },
  soilMoisture: { value: 65, unit: '%', status: 'normal', lastUpdate: '1 min ago' },
  temperature: { value: 24.5, unit: '°C', status: 'normal', lastUpdate: '1 min ago' },
  humidity: { value: 72, unit: '%', status: 'high', lastUpdate: '1 min ago' }
};

const mockSystemActions = [
  { id: 1, action: 'Activated irrigation system', time: '10:30 AM', status: 'completed' },
  { id: 2, action: 'Applied fertilizer mix', time: '09:15 AM', status: 'completed' },
  { id: 3, action: 'Adjusted NPK levels', time: '08:45 AM', status: 'in-progress' },
  { id: 4, action: 'Soil moisture check', time: '07:30 AM', status: 'completed' }
];

const mockTankData = {
  waterTank: { level: 25, capacity: 1000, unit: 'L', status: 'low' },
  fertilizerTank: { level: 5, capacity: 500, unit: 'L', status: 'critical' }
};

const Notification = () => {
  const [sensorData, setSensorData] = useState(mockSensorData);
  const [systemActions, setSystemActions] = useState(mockSystemActions);
  const [tankData, setTankData] = useState(mockTankData);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        soilMoisture: {
          ...prev.soilMoisture,
          value: Math.max(20, Math.min(80, prev.soilMoisture.value + (Math.random() - 0.5) * 5))
        },
        temperature: {
          ...prev.temperature,
          value: Math.max(20, Math.min(30, prev.temperature.value + (Math.random() - 0.5) * 2))
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRequestWater = () => {
    const newAction = {
      id: systemActions.length + 1,
      action: 'Water refill requested',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'pending'
    };
    setSystemActions(prev => [newAction, ...prev]);
  };

  const handleRequestFertilizer = () => {
    const newAction = {
      id: systemActions.length + 1,
      action: 'Fertilizer refill requested',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'pending'
    };
    setSystemActions(prev => [newAction, ...prev]);
  };

  const getSensorIcon = (sensor) => {
    switch (sensor) {
      case 'temperature': return <Thermometer className="w-5 h-5" />;
      case 'humidity': return <Droplets className="w-5 h-5" />;
      case 'soilMoisture': return <Eye className="w-5 h-5" />;
      case 'nitrogen': return <TrendingUp className="w-5 h-5" />;
      case 'phosphorus': return <Activity className="w-5 h-5" />;
      case 'potassium': return <Beaker className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'low':
      case 'critical':
        return 'text-red-600';
      case 'high':
        return 'text-amber-600';
      case 'normal':
        return 'text-emerald-600';
      default:
        return 'text-slate-600';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'low':
      case 'critical':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'high':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'normal':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getTankColor = (level) => {
    if (level < 20) return 'bg-gradient-to-r from-red-500 to-red-600';
    if (level < 50) return 'bg-gradient-to-r from-amber-500 to-amber-600';
    return 'bg-gradient-to-r from-emerald-500 to-emerald-600';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">AgriTech Dashboard</h1>
                <p className="text-slate-600 mt-1">Real-time agricultural monitoring system</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-lg">
                <Wifi className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">Connected</span>
              </div>
              <div className="relative">
                <Bell className="w-6 h-6 text-slate-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Sensor Readings */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Environmental Sensors</h2>
            <div className="text-sm text-slate-500">Last updated: {new Date().toLocaleTimeString()}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(sensorData).map(([key, data]) => (
              <div key={key} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-100 rounded-lg">
                        {getSensorIcon(key)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <p className="text-sm text-slate-500">Real-time monitoring</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(data.status)}`}>
                      {data.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-slate-900">{data.value}</span>
                      <span className="text-lg text-slate-500 font-medium">{data.unit}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span>Updated {data.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">System Activity Log</h2>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6">
              <div className="space-y-4">
                {systemActions.map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        action.status === 'completed' ? 'bg-emerald-100' :
                        action.status === 'in-progress' ? 'bg-amber-100' :
                        'bg-red-100'
                      }`}>
                        {action.status === 'completed' && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                        {action.status === 'in-progress' && <Activity className="w-5 h-5 text-amber-600" />}
                        {action.status === 'pending' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{action.action}</h4>
                        <p className="text-sm text-slate-500">{action.time}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      action.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                      action.status === 'in-progress' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {action.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tank Levels */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Resource Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Water Tank */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Droplets className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Water Tank</h3>
                      <p className="text-sm text-slate-500">Primary irrigation source</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(tankData.waterTank.status)}`}>
                    {tankData.waterTank.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">Current Level</span>
                    <span className="text-2xl font-bold text-slate-900">{tankData.waterTank.level}%</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${getTankColor(tankData.waterTank.level)}`}
                        style={{ width: `${tankData.waterTank.level}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>0L</span>
                      <span>{Math.round(tankData.waterTank.level * tankData.waterTank.capacity / 100)}L / {tankData.waterTank.capacity}L</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleRequestWater}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Request Water Refill
                  </button>
                </div>
              </div>
            </div>

            {/* Fertilizer Tank */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-orange-100 rounded-xl">
                      <Beaker className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Fertilizer Tank</h3>
                      <p className="text-sm text-slate-500">Nutrient supply system</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(tankData.fertilizerTank.status)}`}>
                    {tankData.fertilizerTank.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">Current Level</span>
                    <span className="text-2xl font-bold text-slate-900">{tankData.fertilizerTank.level}%</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${getTankColor(tankData.fertilizerTank.level)}`}
                        style={{ width: `${tankData.fertilizerTank.level}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>0L</span>
                      <span>{Math.round(tankData.fertilizerTank.level * tankData.fertilizerTank.capacity / 100)}L / {tankData.fertilizerTank.capacity}L</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleRequestFertilizer}
                    className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    Request Fertilizer Refill
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Notification;