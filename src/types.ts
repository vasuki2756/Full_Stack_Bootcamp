// Capsule type remains as-is
export type Mood = 'hopeful' | 'grateful' | 'excited' | 'nostalgic' | 'dreamy';
export type CapsuleColor = 'blue' | 'pink' | 'green' | 'orange' | 'purple';

export interface Capsule {
  id: number;
  title: string;
  message: string;
  openDate: string;
  createdAt: string;
  isLocked: boolean;
  mood: Mood;
  color: CapsuleColor;
  openedAt?: string;
}


// Shared props used across multiple components
export type SharedProps = {
  formatDate: (dateStr: string) => string;
  getMoodEmoji: (mood: Capsule['mood']) => string;
  getColorClasses: (color: Capsule['color']) => string;
  setCurrentPage: React.Dispatch<React.SetStateAction<'home' | 'create' | 'view'>>;
};

// Props for CreatePage
export type CreatePageProps = SharedProps & {
  newCapsule: Omit<Capsule, 'id' | 'createdAt' | 'isLocked'>;
  setNewCapsule: React.Dispatch<React.SetStateAction<Omit<Capsule, 'id' | 'createdAt' | 'isLocked'>>>;
  createCapsule: () => void;
};

// Props for ViewPage
export type ViewPageProps = SharedProps & {
  selectedCapsule: Capsule | null;
  openCapsule: (capsule: Capsule) => void;
};

// Props for HomePage
export type HomePageProps = SharedProps & {
  capsules: Capsule[];
  setSelectedCapsule: React.Dispatch<React.SetStateAction<Capsule | null>>;
};
