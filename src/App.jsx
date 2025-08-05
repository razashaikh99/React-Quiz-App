import './App.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import MainPage from './Components/MainPage';
import QuizPage from './Components/QuizPage';
import ResultPage from './Components/ResultPage';
import { Route, Routes } from 'react-router-dom';
import AnswerBreakdown from './Components/AnswersBreakdown';
function App() {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/breakdown" element={<AnswerBreakdown />} />
      </Routes>
    </>
  )
}

export default App
