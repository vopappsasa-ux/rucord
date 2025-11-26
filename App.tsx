import React from 'react';
import { DataProvider, useData } from './contexts/DataContext';
import { ServerList } from './components/ServerList';
import { ChannelList } from './components/ChannelList';
import { ChatArea } from './components/ChatArea';
import { UserList } from './components/UserList';
import { AuthModal, SettingsModal } from './components/Modals';
import { CallOverlay } from './components/CallOverlay';
import { HomeView } from './components/HomeView';

const Layout: React.FC = () => {
  const { isMobileMenuOpen, toggleMobileMenu, isAuthenticated, activeServerId, callState, settings } = useData();

  if (!isAuthenticated) return <AuthModal />;

  // Region Flag Helper
  const getFlag = () => {
    switch(settings.region) {
      case 'RU': return '🇷🇺';
      case 'UA': return '🇺🇦';
      default: return '';
    }
  };

  return (
    <div className="flex w-full h-screen bg-[#313338] overflow-hidden relative">
      <SettingsModal />
      
      {/* Desktop Sidebar */}
      <nav className="hidden md:block h-full shrink-0">
        <ServerList />
      </nav>

      {/* Desktop Channel List */}
      <div className="hidden md:block h-full shrink-0">
        <ChannelList />
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute inset-0 z-50 md:hidden flex">
          <div className="bg-[#2b2d31] h-full flex shadow-xl animate-in slide-in-from-left duration-200">
             <ServerList />
             <div className="w-60">
                <ChannelList />
             </div>
          </div>
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={toggleMobileMenu}></div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex min-w-0 relative">
        {/* Style Badge */}
        {settings.region !== 'US' && (
           <div className="absolute top-2 right-2 md:right-[250px] z-10 text-4xl opacity-20 pointer-events-none">
              {getFlag()}
           </div>
        )}

        {callState.isActive ? (
          <CallOverlay />
        ) : activeServerId === 'home' ? (
          <HomeView />
        ) : (
          <>
            <ChatArea />
            <UserList />
          </>
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <DataProvider>
      <Layout />
    </DataProvider>
  );
}

export default App;