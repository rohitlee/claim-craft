import React, { useState, useCallback, useEffect } from 'react';
import { PracticeQuestion, AIFeedback, UserProgress, Difficulty, Gender, User } from './types';
import { getAIFeedback } from './services/geminiService';
import Header from './components/Header';
import QuestionList from './components/QuestionList';
import PracticeView from './components/PracticeView';
import FeedbackView from './components/FeedbackView';
import LoadingSpinner from './components/LoadingSpinner';
import ProfileView from './components/ProfileView';
import ProgressView from './components/ProgressView';
import LoginPage from './components/LoginPage';
import AdminView from './components/AdminView';
import AdminHeader from './components/AdminHeader';
import { onAuthChange, login, signup } from './services/AuthService';
import { doc, setDoc, getDoc, updateDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { db, auth } from './services/firebase';

type AppView = 'list' | 'practice' | 'feedback' | 'profile' | 'progress' | 'admin';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('list');
  const [selectedQuestion, setSelectedQuestion] = useState<PracticeQuestion | null>(null);
  const [aiFeedback, setAiFeedback] = useState<AIFeedback | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({});
  const [practiceQuestions, setPracticeQuestions] = useState<PracticeQuestion[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        setUser(user);
        if (user.email === 'questioncrafter@gmail.com') {
          setCurrentView('admin');
        } else {
          if (auth.currentUser) {
            const userProgressDoc = await getDoc(doc(db, 'userProgress', auth.currentUser.uid));
            if (userProgressDoc.exists()) {
              setUserProgress(userProgressDoc.data() as UserProgress);
            }
          }
          fetchPracticeQuestions();
          setCurrentView('list');
        }
      } else {
        setUser(null);
        setCurrentView('list');
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchPracticeQuestions = async () => {
    const questionsCol = collection(db, 'practiceQuestions');
    const questionSnapshot = await getDocs(questionsCol);
    const questionList = questionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PracticeQuestion));
    setPracticeQuestions(questionList);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const loggedInUser = await login(email, password);
      if (loggedInUser.email === 'questioncrafter@gmail.com') {
        setCurrentView('admin');
      } else {
        setUser(loggedInUser);
        setCurrentView('list');
      }
    } catch (error) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  const handleSignup = async (name: string, gender: Gender, email: string, password: string) => {
    try {
      await signup(name, gender, email, password);
    } catch (error) {
      setError('Failed to sign up. Please try again.');
    }
  };

  const handleUpdateProfile = async (name: string, gender: Gender) => {
    if (user && auth.currentUser) {
      const updatedUser = { ...user, name, gender };
      setUser(updatedUser);
      await updateDoc(doc(db, 'users', auth.currentUser.uid), { name, gender });
      setCurrentView('list');
    }
  };

  const handleAddQuestion = async (question: Omit<PracticeQuestion, 'id'>, imageUrl: string) => {
    try {
      const imageUrls: string[] = imageUrl ? [imageUrl] : [];

      await addDoc(collection(db, 'practiceQuestions'), { ...question, imageUrls });
      fetchPracticeQuestions();
      setCurrentView('list');
    } catch (error) {
      setError('Failed to add question. Please try again.');
    }
  };

  const handleSelectQuestion = (question: PracticeQuestion) => {
    setSelectedQuestion(question);
    setAiFeedback(null);
    setError(null);
    setCurrentView('practice');
  };

  const handleBackToList = () => {
    setSelectedQuestion(null);
    setAiFeedback(null);
    setError(null);
    setCurrentView('list');
  };

  const handleProfileClick = () => {
    setCurrentView('profile');
  };

  const handleProgressClick = () => {
    setCurrentView('progress');
  };

  const handleViewFeedback = (feedback: AIFeedback) => {
    setAiFeedback(feedback);
    setCurrentView('feedback');
  };
  
  const handleSetDifficulty = async (questionId: string, difficulty: Difficulty) => {
    if (user && auth.currentUser) {
      const newProgress = {
        ...userProgress,
        [questionId]: {
          ...userProgress[questionId],
          difficulty: difficulty,
        }
      };
      setUserProgress(newProgress);
      await setDoc(doc(db, 'userProgress', auth.currentUser.uid), newProgress);
    }
  };

  const handleSubmitClaim = useCallback(async (userClaim: string) => {
    if (!selectedQuestion || !user || !auth.currentUser) return;

    setIsLoading(true);
    setError(null);
    try {
      const feedback = await getAIFeedback(
        userClaim,
        selectedQuestion.originalClaim,
        selectedQuestion.novelty,
        selectedQuestion.inventiveStep
      );
      setAiFeedback(feedback);
      const newProgress = {
        ...userProgress,
        [selectedQuestion.id]: {
          ...userProgress[selectedQuestion.id],
          score: feedback.score,
          feedback: feedback, // Store the full feedback object
        }
      };
      setUserProgress(newProgress);
      await setDoc(doc(db, 'userProgress', auth.currentUser.uid), newProgress);
      setCurrentView('feedback');
    } catch (err) {
      console.error(err);
      setError('Failed to get feedback from AI. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedQuestion, user, userProgress]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-96">
          <LoadingSpinner />
          <p className="text-slate-600 mt-4 text-lg">Analyzing your claim...</p>
        </div>
      );
    }
    
    if (error) {
       return (
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => setError(null)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    switch (currentView) {
      case 'admin':
        return <AdminView onAddQuestion={handleAddQuestion} />;
      case 'practice':
        return selectedQuestion && <PracticeView question={selectedQuestion} onSubmit={handleSubmitClaim} />;
      case 'feedback':
        return aiFeedback && <FeedbackView feedback={aiFeedback} onBack={handleBackToList} />;
      case 'profile':
        return user && <ProfileView user={user} onUpdateProfile={handleUpdateProfile} />;
      case 'progress':
        return <ProgressView questions={practiceQuestions} userProgress={userProgress} onViewFeedback={handleViewFeedback} />;
      case 'list':
      default:
        return <QuestionList questions={practiceQuestions} onSelect={handleSelectQuestion} />;
    }
  };

  if (!user && currentView !== 'admin') {
    return <LoginPage onLogin={handleLogin} onSignup={handleSignup} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {currentView === 'admin' ? <AdminHeader /> : <Header onHomeClick={handleBackToList} onProfileClick={handleProfileClick} onProgressClick={handleProgressClick} gender={user?.gender ?? null} />}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;