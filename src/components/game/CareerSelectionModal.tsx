'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CareerType } from '@/types/game';

interface CareerSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCareer: (career: CareerType, customCareer?: string) => void;
}

const careerOptions = [
  {
    id: CareerType.LAW,
    title: 'Law / Legal Profession',
    icon: '⚖️',
    description: 'Learn legal terminology and concepts',
    gradient: 'from-purple-400 to-purple-600'
  },
  {
    id: CareerType.IT,
    title: 'Information Technology (IT)',
    icon: '💻',
    description: 'Explore technology and programming terms',
    gradient: 'from-blue-400 to-blue-600'
  },
  {
    id: CareerType.AVIATION,
    title: 'Aviation / Piloting',
    icon: '✈️',
    description: 'Discover aviation and flight terminology',
    gradient: 'from-cyan-400 to-cyan-600'
  },
  {
    id: CareerType.MEDICAL,
    title: 'Medical / Healthcare',
    icon: '🏥',
    description: 'Learn medical and healthcare terms',
    gradient: 'from-green-400 to-green-600'
  },
  {
    id: CareerType.POLICE,
    title: 'Police Operations',
    icon: '🚓',
    description: 'Learn law enforcement terminology',
    gradient: 'from-red-400 to-red-600'
  },
  {
    id: CareerType.CUSTOM,
    title: 'Others',
    icon: '🎯',
    description: 'Enter your own profession',
    gradient: 'from-orange-400 to-orange-600'
  }
];

export const CareerSelectionModal: React.FC<CareerSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectCareer,
}) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerType | null>(null);
  const [customCareerName, setCustomCareerName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleCareerSelect = (careerId: CareerType) => {
    setSelectedCareer(careerId);
    if (careerId === CareerType.CUSTOM) {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      setCustomCareerName('');
    }
  };

  const handleConfirm = () => {
    if (selectedCareer) {
      if (selectedCareer === CareerType.CUSTOM && customCareerName.trim()) {
        onSelectCareer(selectedCareer, customCareerName.trim());
      } else if (selectedCareer !== CareerType.CUSTOM) {
        onSelectCareer(selectedCareer);
      }
    }
  };

  const isConfirmDisabled = !selectedCareer || 
    (selectedCareer === CareerType.CUSTOM && !customCareerName.trim());

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <Card padding="none" className="relative overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-coral-400 to-purple-500 p-6 text-white relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="text-4xl mb-3"
                  >
                    💼
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">Choose Your Career Path</h2>
                  <p className="text-coral-100">
                    Select a profession to explore its vocabulary and terminology
                  </p>
                </div>
              </div>

              {/* Career Options */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {careerOptions.map((career, index) => (
                    <motion.div
                      key={career.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        padding="none"
                        onClick={() => handleCareerSelect(career.id)}
                        className={`cursor-pointer border-2 transition-all duration-300 ${
                          selectedCareer === career.id
                            ? 'border-coral-400 bg-coral-50 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }`}
                      >
                        <div className={`bg-gradient-to-br ${career.gradient} p-4 text-white relative`}>
                          <div className="flex items-center justify-between">
                            <span className="text-3xl">{career.icon}</span>
                            {selectedCareer === career.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-white"
                              >
                                <CheckCircle className="w-6 h-6" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {career.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {career.description}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Custom Career Input */}
                <AnimatePresence>
                  {showCustomInput && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6"
                    >
                      <Card className="border-orange-200 bg-orange-50">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-orange-800 flex items-center space-x-2">
                            <span>🎯</span>
                            <span>Enter Your Profession</span>
                          </h4>
                          <input
                            type="text"
                            value={customCareerName}
                            onChange={(e) => setCustomCareerName(e.target.value)}
                            placeholder="e.g., Chef, Artist, Musician..."
                            className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-400 focus:outline-none bg-white"
                            autoFocus
                          />
                          <p className="text-sm text-orange-700">
                            Questions will be generated based on general vocabulary suitable for your profession.
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    disabled={isConfirmDisabled}
                    className="flex-1 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700"
                  >
                    Start Learning
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
