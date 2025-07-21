
import React from 'react';
import { Session } from '@supabase/supabase-js';
import Button from './ui/Button';
import { Link } from 'react-router-dom'; // Movido para cima

interface HeaderProps {
  session: Session | null;
  onLogout: () => void;
}

const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-emerald-500">
        <path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 18 0h-2a7 7 0 0 1-7 7z"></path>
        <path d="M12 10a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3z"></path>
    </svg>
);

const Header: React.FC<HeaderProps> = ({ session, onLogout }) => {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50"> {/* Adicionado fixed, top-0, left-0, w-full, z-50 */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3"> {/* Tornar o título clicável */}
            <LeafIcon />
            <h1 className="text-2xl font-bold text-slate-800">
                Vitalidade<span className="text-emerald-600">Dourada</span> AI
            </h1>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-slate-700 hover:text-emerald-600 transition-colors">
            Home
          </Link>
          <a href="https://automation.aimentory.com.br/form/c6ab06e4-a8d9-4f1a-b5e6-beea1a9cb946" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-emerald-600 transition-colors">
            Feedback
          </a>
          {session && (
            <Button onClick={onLogout} variant="secondary">
              Sair
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
