import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

interface ProfileViewsData {
  totalViews: number;
  todayViews: number;
  referenceDate: string; // Store reference date for daily increments
}

const ProfileViews: React.FC = () => {
  const [viewsData, setViewsData] = useState<ProfileViewsData>({
    totalViews: 0,
    todayViews: 0,
    referenceDate: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  // Calculate dummy profile views with daily increments
  useEffect(() => {
    let isMounted = true;

    const initializeProfileViews = async () => {
      try {
        setIsLoading(true);

        // Get stored views data from localStorage
        const storedData = localStorage.getItem('portfolioViews');
        let currentData: ProfileViewsData;

        if (storedData) {
          const parsed = JSON.parse(storedData);
          currentData = {
            totalViews: parsed.totalViews || 0,
            todayViews: parsed.todayViews || 0,
            referenceDate: parsed.referenceDate || ''
          };
        } else {
          // Initialize with default data - start with 100 views
          const today = new Date().toISOString().split('T')[0];
          currentData = {
            totalViews: 100, // Start with 100 dummy views
            todayViews: 1,
            referenceDate: today
          };
        }

        // Calculate daily increments
        const today = new Date().toISOString().split('T')[0];
        const referenceDate = currentData.referenceDate || today;
        
        // Calculate days difference
        const startDate = new Date(referenceDate);
        const currentDate = new Date(today);
        const daysDiff = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        
        // Calculate total views: 100 (base) + days since reference date
        const calculatedTotalViews = 100 + daysDiff;
        
        // Update data if there's a change
        if (calculatedTotalViews !== currentData.totalViews) {
          currentData.totalViews = calculatedTotalViews;
          currentData.todayViews = 1; // Reset today's views
          currentData.referenceDate = referenceDate;
          
          // Store updated data
          localStorage.setItem('portfolioViews', JSON.stringify(currentData));
        }

        if (isMounted) {
          setViewsData(currentData);
        }
      } catch (error) {
        console.error('Error initializing profile views:', error);
        // Fallback data
        if (isMounted) {
          setViewsData({
            totalViews: 100,
            todayViews: 1,
            referenceDate: new Date().toISOString().split('T')[0]
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeProfileViews();

    return () => {
      isMounted = false;
    };
  }, []);

  const profileViewsElement = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2rem 1rem',
        width: '100%',
        maxWidth: '1800px',
        margin: '0 auto',
        gap: '0.5rem'
      }}
      className="hidden lg:block"
    >
      {/* Batman Quote */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        style={{ flex: 1, maxWidth: '280px' }}
        whileHover={{ 
          scale: 1.02,
          filter: 'brightness(1.1)',
          transition: { duration: 0.2 }
        }}
      >
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 193, 7, 0.3)',
            borderRadius: '0.5rem',
            padding: '1.25rem',
            boxShadow: `
              0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06),
              0 0 20px rgba(255, 193, 7, 0.2),
              0 0 40px rgba(255, 193, 7, 0.1),
              inset 0 0 20px rgba(255, 193, 7, 0.05)
            `
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div 
              style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                background: 'rgba(255, 193, 7, 0.2)',
                fontSize: '1.25rem',
                boxShadow: '0 0 15px rgba(255, 193, 7, 0.4)'
              }}
            >
              🦇
            </div>
            <div>
              <p style={{ 
                fontSize: '0.7rem', 
                fontWeight: '600', 
                color: '#FFFFFF',
                margin: '0 0 0.5rem 0',
                fontStyle: 'italic',
                lineHeight: '1.4',
                textShadow: '0 0 10px rgba(255, 193, 7, 0.3)'
              }}>
                "It's not who I am underneath, but what I do that defines me."
              </p>
              <p style={{ 
                fontSize: '0.6rem', 
                color: 'rgba(255, 255, 255, 0.6)',
                margin: 0,
                fontWeight: '500'
              }}>
                — Batman
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Iron Man Quote */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ flex: 1, maxWidth: '280px' }}
        whileHover={{ 
          scale: 1.02,
          filter: 'brightness(1.1)',
          transition: { duration: 0.2 }
        }}
      >
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 69, 0, 0.3)',
            borderRadius: '0.5rem',
            padding: '1.25rem',
            boxShadow: `
              0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06),
              0 0 20px rgba(255, 69, 0, 0.2),
              0 0 40px rgba(255, 69, 0, 0.1),
              inset 0 0 20px rgba(255, 69, 0, 0.05)
            `
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div 
              style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                background: 'rgba(255, 69, 0, 0.2)',
                fontSize: '1.25rem',
                boxShadow: '0 0 15px rgba(255, 69, 0, 0.4)'
              }}
            >
              🤖
            </div>
            <div>
              <p style={{ 
                fontSize: '0.7rem', 
                fontWeight: '600', 
                color: '#FFFFFF',
                margin: '0 0 0.5rem 0',
                fontStyle: 'italic',
                lineHeight: '1.4',
                textShadow: '0 0 10px rgba(255, 69, 0, 0.3)'
              }}>
                "Sometimes you gotta run before you can walk."
              </p>
              <p style={{ 
                fontSize: '0.6rem', 
                color: 'rgba(255, 255, 255, 0.6)',
                margin: 0,
                fontWeight: '500'
              }}>
                — Iron Man
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sung Jin-Woo Quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ flex: 1, maxWidth: '280px' }}
        whileHover={{ 
          scale: 1.02,
          filter: 'brightness(1.1)',
          transition: { duration: 0.2 }
        }}
      >
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(138, 43, 226, 0.3)',
            borderRadius: '0.5rem',
            padding: '1.25rem',
            boxShadow: `
              0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06),
              0 0 20px rgba(138, 43, 226, 0.2),
              0 0 40px rgba(138, 43, 226, 0.1),
              inset 0 0 20px rgba(138, 43, 226, 0.05)
            `
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div 
              style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                background: 'rgba(138, 43, 226, 0.2)',
                fontSize: '1.25rem',
                boxShadow: '0 0 15px rgba(138, 43, 226, 0.4)'
              }}
            >
              ⚔️
            </div>
            <div>
              <p style={{ 
                fontSize: '0.7rem', 
                fontWeight: '600', 
                color: '#FFFFFF',
                margin: '0 0 0.5rem 0',
                fontStyle: 'italic',
                lineHeight: '1.4',
                textShadow: '0 0 10px rgba(138, 43, 226, 0.3)'
              }}>
                "I alone am the honored one."
              </p>
              <p style={{ 
                fontSize: '0.6rem', 
                color: 'rgba(255, 255, 255, 0.6)',
                margin: 0,
                fontWeight: '500'
              }}>
                — Sung Jin-Woo
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tanjiro Quote */}
      <motion.div
        initial={{ opacity: 0, rotateY: -15 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        style={{ flex: 1, maxWidth: '280px' }}
        whileHover={{ 
          scale: 1.02,
          filter: 'brightness(1.1)',
          transition: { duration: 0.2 }
        }}
      >
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 0, 0, 0.3)',
            borderRadius: '0.5rem',
            padding: '1.25rem',
            boxShadow: `
              0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06),
              0 0 20px rgba(255, 0, 0, 0.2),
              0 0 40px rgba(255, 0, 0, 0.1),
              inset 0 0 20px rgba(255, 0, 0, 0.05)
            `
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div 
              style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                background: 'rgba(255, 0, 0, 0.2)',
                fontSize: '1.25rem',
                boxShadow: '0 0 15px rgba(255, 0, 0, 0.4)'
              }}
            >
              🔥
            </div>
            <div>
              <p style={{ 
                fontSize: '0.7rem', 
                fontWeight: '600', 
                color: '#FFFFFF',
                margin: '0 0 0.5rem 0',
                fontStyle: 'italic',
                lineHeight: '1.4',
                textShadow: '0 0 10px rgba(255, 0, 0, 0.3)'
              }}>
                "I will never give up, no matter what!"
              </p>
              <p style={{ 
                fontSize: '0.6rem', 
                color: 'rgba(255, 255, 255, 0.6)',
                margin: 0,
                fontWeight: '500'
              }}>
                — Tanjiro
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Views Widget */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        whileHover={{ 
          scale: 1.02,
          filter: 'brightness(1.1)',
          transition: { duration: 0.2 }
        }}
      >
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 193, 7, 0.3)',
            borderRadius: '0.5rem',
            padding: '1rem',
            boxShadow: `
              0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06),
              0 0 20px rgba(255, 193, 7, 0.2),
              0 0 40px rgba(255, 193, 7, 0.1),
              inset 0 0 20px rgba(255, 193, 7, 0.05)
            `
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div 
              style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                background: 'rgba(255, 193, 7, 0.2)',
                boxShadow: '0 0 15px rgba(255, 193, 7, 0.4)'
              }}
            >
              <Eye size={16} style={{ color: '#FFC107' }} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ 
                fontSize: '0.875rem', 
                fontWeight: '600', 
                color: '#FFFFFF',
                margin: 0,
                textShadow: '0 0 10px rgba(255, 193, 7, 0.3)'
              }}>
                {isLoading ? '...' : viewsData.totalViews.toLocaleString()}
              </p>
              <p style={{ 
                fontSize: '0.75rem', 
                color: 'rgba(255, 255, 255, 0.6)',
                margin: 0
              }}>
                Profile Views
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return profileViewsElement;
};

export default ProfileViews; 