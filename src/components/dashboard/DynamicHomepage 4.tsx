'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from './DashboardContext';

interface DynamicHomePageProps {
  language: 'en' | 'es';
}

interface LocationData {
  city: string;
  state: string;
  timezone: string;
  coordinates: [number, number];
}

interface RecentWin {
  id: string;
  title: string;
  amount: string;
  date: string;
  type: 'settlement' | 'award' | 'dismissal';
}

const DynamicHomepage: React.FC<DynamicHomePageProps> = ({ language }) => {
  const { data, isConnected } = useDashboard();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [greeting, setGreeting] = useState('');
  const [recentWins, setRecentWins] = useState<RecentWin[]>([]);
  const [latestBlogPosts, setLatestBlogPosts] = useState<
    Array<{ title: string; slug: string; date: string }>
  >([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          try {
            const response = await fetch(
              `/api/location?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            );
            const locationData = await response.json();
            setUserLocation(locationData);
          } catch (error) {
            console.error('Error getting location:', error);
          }
        },
        error => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    // Generate time-based greeting
    const hour = currentTime.getHours();
    let timeGreeting = '';

    if (language === 'es') {
      if (hour < 12) timeGreeting = 'Buenos días';
      else if (hour < 18) timeGreeting = 'Buenas tardes';
      else timeGreeting = 'Buenas noches';
    } else {
      if (hour < 12) timeGreeting = 'Good morning';
      else if (hour < 18) timeGreeting = 'Good afternoon';
      else timeGreeting = 'Good evening';
    }

    const locationText = userLocation ? `, ${userLocation.city}` : '';
    setGreeting(`${timeGreeting}${locationText}`);
  }, [currentTime, userLocation, language]);

  useEffect(() => {
    // Fetch recent wins
    const fetchRecentWins = async () => {
      try {
        const response = await fetch('/api/cases/recent-wins');
        const wins = await response.json();
        setRecentWins(wins.slice(0, 3));
      } catch (error) {
        console.error('Error fetching recent wins:', error);
      }
    };

    // Fetch latest blog posts
    const fetchLatestBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog/latest');
        const posts = await response.json();
        setLatestBlogPosts(posts.slice(0, 3));
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchRecentWins();
    fetchLatestBlogPosts();
  }, []);

  const getTimeBasedContent = () => {
    const hour = currentTime.getHours();

    if (language === 'es') {
      if (hour < 9) {
        return {
          title: 'Comenzamos temprano por usted',
          subtitle: 'Nuestro equipo ya está trabajando en su caso',
        };
      } else if (hour < 17) {
        return {
          title: 'En plena acción legal',
          subtitle: 'Luchando por sus derechos en este momento',
        };
      } else {
        return {
          title: 'Trabajamos hasta tarde',
          subtitle: 'Su caso no descansa, nosotros tampoco',
        };
      }
    } else {
      if (hour < 9) {
        return {
          title: 'We Start Early for You',
          subtitle: 'Our team is already working on your case',
        };
      } else if (hour < 17) {
        return {
          title: 'In Full Legal Action',
          subtitle: 'Fighting for your rights right now',
        };
      } else {
        return {
          title: 'We Work Late',
          subtitle: "Your case doesn't rest, neither do we",
        };
      }
    }
  };

  const content = getTimeBasedContent();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-yellow-400/30 to-transparent rounded-full blur-3xl animate-ping" />
      </div>

      {/* Live Status Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 right-4 z-50 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2"
      >
        <div
          className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}
        />
        <span className="text-sm text-white">{isConnected ? 'LIVE' : 'OFFLINE'}</span>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Dynamic Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.p
            key={greeting}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-yellow-400 text-xl mb-4"
          >
            {greeting}
          </motion.p>

          <motion.h1
            key={content.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent"
          >
            {content.title}
          </motion.h1>

          <motion.p
            key={content.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            {content.subtitle}
          </motion.p>
        </motion.div>

        {/* Live Metrics Display */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-lg p-6 text-center"
          >
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {data.metrics.visitorCount}
            </div>
            <div className="text-sm text-gray-300">
              {language === 'es' ? 'Visitantes activos' : 'Active visitors'}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm rounded-lg p-6 text-center"
          >
            <div className="text-3xl font-bold text-green-400 mb-2">
              {data.metrics.conversationsActive}
            </div>
            <div className="text-sm text-gray-300">
              {language === 'es' ? 'Conversaciones activas' : 'Active conversations'}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-lg p-6 text-center"
          >
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {data.metrics.reviewsToday}
            </div>
            <div className="text-sm text-gray-300">
              {language === 'es' ? 'Reseñas hoy' : 'Reviews today'}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-lg p-6 text-center"
          >
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {data.metrics.contentCreated}
            </div>
            <div className="text-sm text-gray-300">
              {language === 'es' ? 'Contenido creado' : 'Content created'}
            </div>
          </motion.div>
        </div>

        {/* Recent Wins Section */}
        {recentWins.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              {language === 'es' ? 'Victorias Recientes' : 'Recent Wins'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentWins.map((win, index) => (
                <motion.div
                  key={win.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-lg p-6"
                >
                  <div className="text-2xl font-bold text-green-400 mb-2">{win.amount}</div>
                  <div className="text-white font-semibold mb-2">{win.title}</div>
                  <div className="text-gray-300 text-sm">
                    {new Date(win.date).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Latest Blog Posts */}
        {latestBlogPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              {language === 'es' ? 'Últimas Publicaciones' : 'Latest Blog Posts'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestBlogPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-lg p-6 hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="text-white font-semibold mb-2">{post.title}</div>
                  <div className="text-gray-300 text-sm">
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Real-time Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-black/50 backdrop-blur-sm rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {language === 'es' ? 'Actividad en Tiempo Real' : 'Real-time Activity'}
          </h2>
          <div className="max-h-64 overflow-y-auto space-y-3">
            {data.recentActivity.slice(0, 5).map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg"
              >
                <div
                  className={`w-2 h-2 rounded-full ${activity.success ? 'bg-green-500' : 'bg-red-500'}`}
                />
                <span className="text-white text-sm">{activity.message}</span>
                <span className="text-gray-400 text-xs ml-auto">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DynamicHomepage;
