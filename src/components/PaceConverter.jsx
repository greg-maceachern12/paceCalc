import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PaceConverter = () => {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [currentUnit, setCurrentUnit] = useState('kmToMile');
  const [result, setResult] = useState('');

  // Move this hook after the function definition
  React.useEffect(() => {
    if (minutes === '' && seconds === '') {
      setResult('Enter a pace above');
      return;
    }
    
    const mins = parseInt(minutes) || 0;
    const secs = parseInt(seconds) || 0;

    if (mins === 0 && secs === 0) {
      setResult('Enter a pace above');
      return;
    }

    if (secs >= 60) {
      setResult('Please enter valid seconds (0-59)');
      return;
    }

    const totalMinutes = mins + secs / 60;
    let convertedMinutes;

    if (currentUnit === 'kmToMile') {
      convertedMinutes = totalMinutes * 1.60934;
      const convertedMin = Math.floor(convertedMinutes);
      const convertedSec = Math.round((convertedMinutes - convertedMin) * 60);
      setResult(`${mins}:${secs.toString().padStart(2, '0')} min/km = ${convertedMin}:${convertedSec.toString().padStart(2, '0')} min/mile`);
    } else {
      convertedMinutes = totalMinutes / 1.60934;
      const convertedMin = Math.floor(convertedMinutes);
      const convertedSec = Math.round((convertedMinutes - convertedMin) * 60);
      setResult(`${mins}:${secs.toString().padStart(2, '0')} min/mile = ${convertedMin}:${convertedSec.toString().padStart(2, '0')} min/km`);
    }
  }, [minutes, seconds, currentUnit]); // Include all dependencies

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const inputVariants = {
    focus: { scale: 1.02 },
    blur: { scale: 1 }
  };

  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    inactive: { opacity: 0.7 },
    active: { opacity: 1 }
  };

  const resultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 flex items-center justify-center">
      <motion.div 
        className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Pace Converter
        </motion.h1>

        <div className="mb-6">
          <motion.label 
            className="block text-gray-700 text-sm font-medium mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Pace
          </motion.label>
          <div className="flex space-x-2">
            <motion.div className="flex-1" variants={inputVariants}>
              <motion.input
                type="number"
                placeholder="min"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-colors"
                whileFocus="focus"
                initial="blur"
                animate="blur"
              />
            </motion.div>
            <motion.div className="flex-1" variants={inputVariants}>
              <motion.input
                type="number"
                placeholder="sec"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-colors"
                whileFocus="focus"
                initial="blur"
                animate="blur"
              />
            </motion.div>
          </div>
        </div>

        <div className="mb-6">
          <motion.label 
            className="block text-gray-700 text-sm font-medium mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Unit
          </motion.label>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <motion.button
              onClick={() => setCurrentUnit('kmToMile')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                currentUnit === 'kmToMile'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              animate={currentUnit === 'kmToMile' ? 'active' : 'inactive'}
            >
              km to mile
            </motion.button>
            <motion.button
              onClick={() => setCurrentUnit('mileToKm')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                currentUnit === 'mileToKm'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              animate={currentUnit === 'mileToKm' ? 'active' : 'inactive'}
            >
              mile to km
            </motion.button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={result}
            className="mt-6 text-center"
            variants={resultVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p className="text-lg text-gray-800 font-medium">{result}</p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PaceConverter;