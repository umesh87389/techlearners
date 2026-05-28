// ---------- Data ----------
const notesData = {
    '9': [
        { title: 'Introduction to AI', content: 'AI mimics human intelligence. Covers history, types: narrow AI, general AI. Examples: Siri, chatbots.' },
        { title: 'AI Project Cycle', content: 'Problem Scoping, Data Acquisition, Data Exploration, Modelling, Evaluation. Key steps for building AI projects.' },
        { title: 'Neural Networks Basics', content: 'Perceptron, activation functions, layers, forward propagation. Foundation of deep learning.' },
        { title: 'AI Ethics', content: 'Bias, privacy, transparency, accountability. Importance of ethical AI development.' }
    ],
    '10': [
        { title: 'Advanced AI Concepts', content: 'Supervised vs Unsupervised, Reinforcement Learning, hyperparameter tuning, model deployment.' },
        { title: 'Natural Language Processing', content: 'Tokenization, sentiment analysis, transformers, BERT. Text preprocessing and chatbots.' },
        { title: 'Computer Vision', content: 'Image classification, CNNs, object detection, OpenCV basics.' },
        { title: 'AI Evaluation', content: 'Confusion matrix, accuracy, precision, recall, F1 score, cross-validation.' }
    ]
};
const videosData = {
    '9': [
        { title: 'AI Domains', youtubeId: '3Dt5Vw4W1aE' },
        { title: 'Machine Learning Intro', youtubeId: 'ukzFI9rgwfU' },
        { title: 'Python for AI', youtubeId: 'ZDa-Z5JzLYM' }
    ],
    '10': [
        { title: 'Deep Learning Basics', youtubeId: 'gZmobeGL0Yg' },
        { title: 'AI Applications', youtubeId: 'oV74Najm6Nc' },
        { title: 'Data Science', youtubeId: 'X3paOmJd3mA' }
    ]
};

// Helper: fuzzy search setup
function getFuse(list, keys) {
    return new Fuse(list, { keys, threshold: 0.3 });
}

// Theme hook
function useTheme() {
    const [theme, setTheme] = React.useState(() => localStorage.getItem('theme') || 'system');
    React.useEffect(() => {
        const root = document.body;
        if (theme === 'system') {
            const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.className = dark ? 'dark' : 'light';
        } else {
            root.className = theme;
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    return [theme, setTheme];
}

// Components
const Header = () => {
    const [theme, setTheme] = useTheme();
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <div className="logo">
                <h1><i className="fas fa-robot"></i> Tech Learners</h1>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.5rem 1rem', borderRadius: '2rem' }}>
                <i className="fas fa-palette"></i>
                <select value={theme} onChange={(e) => setTheme(e.target.value)} style={{ background: 'transparent', border: 'none', color: 'inherit' }}>
                    <option value="system">🌓 System</option>
                    <option value="light">☀️ Light</option>
                    <option value="dark">🌙 Dark</option>
                </select>
            </div>
        </div>
    );
};

const ClassSelector = ({ currentClass, setCurrentClass }) => (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', margin: '1.5rem 0' }}>
        <button className={`class-btn ${currentClass === '9' ? 'active' : ''}`} onClick={() => setCurrentClass('9')}>
            <i className="fas fa-microchip"></i> Class 9 AI
        </button>
        <button className={`class-btn ${currentClass === '10' ? 'active' : ''}`} onClick={() => setCurrentClass('10')}>
            <i className="fas fa-brain"></i> Class 10 AI
        </button>
    </div>
);

const SearchBar = ({ query, setQuery }) => (
    <div className="search-container">
        <div style={{ position: 'relative', width: '100%', maxWidth: '450px' }}>
            <i className="fas fa-search search-icon"></i>
            <input type="text" className="search-box" placeholder="Search notes or videos..." value={query} onChange={(e) => setQuery(e.target.value)} />
            {query && <i className="fas fa-times-circle clear-search" onClick={() => setQuery('')}></i>}
        </div>
    </div>
);

const NotesPanel = ({ notes, searchQuery }) => {
    const [selectedNote, setSelectedNote] = React.useState(null);
    if (notes.length === 0) return <div style={{ textAlign: 'center', padding: '2rem' }}>No notes found for "{searchQuery}"</div>;
    return (
        <>
            <div className="card-grid">
                {notes.map((note, idx) => (
                    <div className="info-card" key={idx}>
                        <i className="fas fa-file-alt" style={{ fontSize: '2rem', color: '#f97316' }}></i>
                        <h3>{note.title}</h3>
                        <p>{note.content.substring(0, 80)}...</p>
                        <button className="btn-glass" onClick={() => setSelectedNote(note)}><i className="fas fa-eye"></i> View Notes</button>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button className="btn-glass" onClick={() => window.open('https://meet.google.com/', '_blank')}><i className="fab fa-google"></i> Join Live Class</button>
            </div>
            {selectedNote && (
                <div className="modal-overlay" onClick={() => setSelectedNote(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3><i className="fas fa-sticky-note"></i> {selectedNote.title}</h3>
                        <p style={{ margin: '1rem 0', lineHeight: 1.5 }}>{selectedNote.content}</p>
                        <button className="btn-glass" onClick={() => setSelectedNote(null)}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

const VideosPanel = ({ videos, searchQuery }) => {
    if (videos.length === 0) return <div style={{ textAlign: 'center', padding: '2rem' }}>No videos found for "{searchQuery}"</div>;
    return (
        <>
            <div className="card-grid">
                {videos.map((video, idx) => (
                    <div className="info-card" key={idx}>
                        <i className="fab fa-youtube" style={{ fontSize: '2rem', color: '#ff0000' }}></i>
                        <h3>{video.title}</h3>
                        <div className="video-embed">
                            <iframe src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button className="btn-glass" onClick={() => window.open('https://meet.google.com/', '_blank')}><i className="fab fa-google"></i> Start Live Class</button>
            </div>
        </>
    );
};

const Footer = () => {
    const [modal, setModal] = React.useState(null);
    const [feedback, setFeedback] = React.useState({ name: '', email: '', message: '', rating: '5' });
    const [status, setStatus] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!feedback.name || !feedback.message) {
            setStatus('❌ Please fill name and message.');
            return;
        }
        // Simulate API call (store in localStorage for demo)
        const allFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        allFeedbacks.push({ ...feedback, date: new Date().toISOString() });
        localStorage.setItem('feedbacks', JSON.stringify(allFeedbacks));
        setStatus('✅ Thank you for your feedback!');
        setFeedback({ name: '', email: '', message: '', rating: '5' });
        setTimeout(() => { setStatus(''); setModal(null); }, 2000);
    };
    const ModalContent = () => {
        if (modal === 'privacy') return <><h3><i className="fas fa-shield-alt"></i> Privacy Policy</h3><p>Effective Date: May 29, 2026
Welcome to Tech Learners. Your privacy is important to us.
At Tech Learners, we may collect basic information such as your name, email address, device information, and website usage data to improve your learning experience and website performance.
We use this information to:
- Provide educational content and services
- Improve website functionality
- Respond to user queries
- Maintain website security
We do not sell or share your personal information with unauthorized third parties.
Our website may use cookies, analytics tools, and embedded services such as YouTube to enhance user experience.
While we take reasonable steps to protect your data, no online platform can guarantee complete security.
Tech Learners may contain links to external websites. We are not responsible for their privacy practices or content.
By using our website, you agree to this Privacy Policy.
Tech Learners
https://techlearners.in</p><button className="btn-glass" onClick={() => setModal(null)}>Close</button></>;
        if (modal === 'contact') return <><h3><i className="fas fa-headset"></i> Contact Us</h3><p><i className="fas fa-envelope"></i> umesh87389@gmail.com</p><p><i className="fab fa-whatsapp"></i> +91 8738943773</p><button className="btn-glass" onClick={() => setModal(null)}>Close</button></>;
        if (modal === 'feedback') return (
            <>
                <h3><i className="fas fa-star"></i> Share Feedback</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" className="glass-input" placeholder="Your Name" value={feedback.name} onChange={(e) => setFeedback({...feedback, name: e.target.value})} required />
                    <input type="email" className="glass-input" placeholder="Email (optional)" value={feedback.email} onChange={(e) => setFeedback({...feedback, email: e.target.value})} />
                    <textarea className="glass-textarea" rows="3" placeholder="Your feedback..." value={feedback.message} onChange={(e) => setFeedback({...feedback, message: e.target.value})} required></textarea>
                    <select className="glass-input" value={feedback.rating} onChange={(e) => setFeedback({...feedback, rating: e.target.value})}>
                        <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                        <option value="4">⭐⭐⭐⭐ Good</option>
                        <option value="3">⭐⭐⭐ Average</option>
                    </select>
                    <button type="submit" className="btn-glass">Submit Feedback</button>
                    {status && <p style={{ marginTop: '0.5rem' }}>{status}</p>}
                </form>
            </>
        );
        return null;
    };
    return (
        <>
            <div className="footer-links">
                <span className="footer-link" onClick={() => setModal('privacy')}><i className="fas fa-shield-alt"></i> Privacy Policy</span>
                <span className="footer-link" onClick={() => setModal('contact')}><i className="fas fa-envelope"></i> Contact Us</span>
                <span className="footer-link" onClick={() => setModal('feedback')}><i className="fas fa-comment-dots"></i> Feedback</span>
                <span className="footer-link" onClick={() => window.open('https://meet.google.com/', '_blank')}><i className="fab fa-google"></i> Google Meet Live</span>
            </div>
            {modal && (
                <div className="modal-overlay" onClick={() => setModal(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <ModalContent />
                    </div>
                </div>
            )}
        </>
    );
};

const App = () => {
    const [currentClass, setCurrentClass] = React.useState('9');
    const [currentTab, setCurrentTab] = React.useState('notes');
    const [searchQuery, setSearchQuery] = React.useState('');
    const notesList = notesData[currentClass];
    const videosList = videosData[currentClass];
    const fuseNotes = React.useMemo(() => new Fuse(notesList, { keys: ['title', 'content'], threshold: 0.3 }), [notesList]);
    const fuseVideos = React.useMemo(() => new Fuse(videosList, { keys: ['title'], threshold: 0.3 }), [videosList]);
    const filteredNotes = searchQuery.trim() === '' ? notesList : fuseNotes.search(searchQuery).map(r => r.item);
    const filteredVideos = searchQuery.trim() === '' ? videosList : fuseVideos.search(searchQuery).map(r => r.item);
    return (
        <div className="glass-home">
            <Header />
            <ClassSelector currentClass={currentClass} setCurrentClass={setCurrentClass} />
            <SearchBar query={searchQuery} setQuery={setSearchQuery} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '1rem 0' }}>
                <button className={`tab ${currentTab === 'notes' ? 'active' : ''}`} onClick={() => setCurrentTab('notes')}><i className="fas fa-sticky-note"></i> Notes</button>
                <button className={`tab ${currentTab === 'videos' ? 'active' : ''}`} onClick={() => setCurrentTab('videos')}><i className="fas fa-play-circle"></i> Video Lectures</button>
            </div>
            {currentTab === 'notes' ? <NotesPanel notes={filteredNotes} searchQuery={searchQuery} /> : <VideosPanel videos={filteredVideos} searchQuery={searchQuery} />}
            <Footer />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
