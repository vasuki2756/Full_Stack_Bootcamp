import React from 'react';
import HomePage from './HomePage';
import CreatePage from './CreatePage';
import ViewPage from './ViewPage';
import type { Capsule } from '../types';

const TimeCapsuleApp: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<'home' | 'create' | 'view'>('home');
  const [capsules, setCapsules] = React.useState<Capsule[]>([]);
  const [selectedCapsule, setSelectedCapsule] = React.useState<Capsule | null>(null);
  const [newCapsule, setNewCapsule] = React.useState<Omit<Capsule, 'id' | 'createdAt' | 'isLocked'>>({
    title: '',
    message: '',
    openDate: '',
    mood: 'hopeful',
    color: 'blue',
  });

  // Load saved capsules on mount
  React.useEffect(() => {
    const savedCapsules: Capsule[] = JSON.parse(localStorage?.getItem('timeCapsules') || '[]');
    setCapsules(savedCapsules);
  }, []);

  // Save to state + localStorage
  const saveCapsules = (updatedCapsules: Capsule[]) => {
    setCapsules(updatedCapsules);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('timeCapsules', JSON.stringify(updatedCapsules));
    }
  };

  // ✅ Utility to check if openDate is in future (compares only Y-M-D, not time)
  const isDateInFuture = (dateStr: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const openDate = new Date(dateStr);
    openDate.setHours(0, 0, 0, 0);

    return openDate > today;
  };

  const createCapsule = () => {
    if (!newCapsule.title || !newCapsule.message || !newCapsule.openDate) return;

    const capsule: Capsule = {
      ...newCapsule,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      isLocked: isDateInFuture(newCapsule.openDate),
    };

    const updatedCapsules = [...capsules, capsule];
    saveCapsules(updatedCapsules);
    setNewCapsule({ title: '', message: '', openDate: '', mood: 'hopeful', color: 'blue' });
    setCurrentPage('home');
  };

  const openCapsule = (capsule: Capsule) => {
    const updatedCapsules = capsules.map(c =>
      c.id === capsule.id ? { ...c, isLocked: false, openedAt: new Date().toISOString() } : c
    );
    saveCapsules(updatedCapsules);
    setSelectedCapsule({ ...capsule, isLocked: false });
    setCurrentPage('view');
  };

  const deleteCapsule = (id: number) => {
    const updatedCapsules = capsules.filter(c => c.id !== id);
    saveCapsules(updatedCapsules);
    setSelectedCapsule(null);
    setCurrentPage('home');
  };

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMoodEmoji = (mood: Capsule['mood']): string => {
    const moods: Record<Capsule['mood'], string> = {
      hopeful: '🌟',
      grateful: '💖',
      excited: '🎉',
      nostalgic: '🌙',
      dreamy: '✨'
    };
    return moods[mood] || '💫';
  };

  const getColorClasses = (color: Capsule['color']): string => {
    const colors: Record<Capsule['color'], string> = {
      blue: 'from-blue-400 to-purple-600',
      pink: 'from-pink-400 to-rose-600',
      green: 'from-green-400 to-teal-600',
      orange: 'from-orange-400 to-red-600',
      purple: 'from-purple-400 to-indigo-600',
    };
    return colors[color] || colors.blue;
  };

  const handlePageChange = (page: string) => {
    if (page === 'home' || page === 'create' || page === 'view') {
      setCurrentPage(page);
    }
  };

  const sharedProps = {
    formatDate,
    getMoodEmoji,
    getColorClasses,
    setCurrentPage: handlePageChange,
  };

  switch (currentPage) {
    case 'create':
      return (
        <CreatePage
          newCapsule={newCapsule}
          setNewCapsule={setNewCapsule}
          createCapsule={createCapsule}
          {...sharedProps}
        />
      );
    case 'view':
      return (
        <ViewPage
          selectedCapsule={selectedCapsule}
          openCapsule={openCapsule}
          deleteCapsule={deleteCapsule} // ✅ Added delete
          {...sharedProps}
        />
      );
    default:
      return (
        <HomePage
          capsules={capsules}
          setSelectedCapsule={setSelectedCapsule}
          {...sharedProps}
        />
      );
  }
};

export default TimeCapsuleApp;
