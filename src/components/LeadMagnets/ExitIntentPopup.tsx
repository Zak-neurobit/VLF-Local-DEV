'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useHydrationSafe';

interface ExitIntentPopupProps {
  onClose?: () => void;
  onAction?: (action: string) => void;
}

export default function ExitIntentPopup({ onClose, onAction }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [lastShown, setLastShown] = useLocalStorage<string | null>('exitIntentLastShown', null);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Detect when mouse leaves viewport from the top
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // Check if user has seen popup in last 7 days
    if (lastShown) {
      const daysSinceShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
      if (daysSinceShown < 7) {
        setHasShown(true);
        return;
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown, lastShown]);

  const handleClose = () => {
    setIsVisible(false);
    setLastShown(Date.now().toString());
    onClose?.();
  };

  const handleAction = (action: string) => {
    handleClose();
    onAction?.(action);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Hero Section */}
              <div className="bg-gradient-to-br from-burgundy-700 to-burgundy-900 text-white p-8 text-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-4xl font-bold mb-4">Wait! Don&apos;t Leave Empty-Handed</h2>
                  <p className="text-xl text-white/90">
                    Get FREE legal resources that could save you thousands
                  </p>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <div className="bg-gold-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-gold-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Legal Guides</h3>
                    <p className="text-gray-600 text-sm">
                      Download our comprehensive guides for your case type
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                  >
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Free Consultation</h3>
                    <p className="text-gray-600 text-sm">
                      Speak with an attorney at no cost or obligation
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                    <p className="text-gray-600 text-sm">
                      Chat with our AI assistant anytime you need help
                    </p>
                  </motion.div>
                </div>

                {/* Special Offer */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-r from-gold-50 to-gold-100 rounded-xl p-6 mb-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xl text-burgundy-900 mb-1">
                        Limited Time: 50% Off Initial Consultation
                      </h4>
                      <p className="text-gray-700">Save $150 when you book in the next 24 hours</p>
                    </div>
                    <div className="text-3xl">⏰</div>
                  </div>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-3"
                >
                  <Button
                    size="lg"
                    className="w-full bg-burgundy-700 hover:bg-burgundy-800"
                    onClick={() => handleAction('consultation')}
                  >
                    Claim Your Discounted Consultation
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleAction('download')}
                  >
                    Download Free Legal Guides
                  </Button>
                  <button
                    onClick={handleClose}
                    className="w-full text-center text-gray-500 hover:text-gray-700 text-sm"
                  >
                    No thanks, I&apos;ll figure it out myself
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
