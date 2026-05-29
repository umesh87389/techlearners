// ---------- Data ----------
const notesData = {
    '9': [
        { title: 'Communication Skill', content: `Communication skill simply means the ability to share your thoughts, feelings, or information with others in a clear and kind way. It’s not just about talking—it also includes listening, understanding, and even your body language. Good communication helps people connect, avoid misunderstandings, and work well together.

What Communication Really Includes:
Speaking clearly – Using simple words so others easily understand you.
Listening carefully – Paying full attention without interrupting. This is often called “active listening.”
Body language – Your facial expressions, gestures, and posture. For example, crossing your arms might make you seem closed off, while nodding shows you are interested.
Tone of voice – How you say something matters as much as the words. A warm tone feels friendly; a harsh tone can push people away.
Written communication – Texts, emails, or notes that are easy to read and not confusing.

Why Communication Skill Is Important?
Builds stronger relationships – When you express yourself honestly and listen well, trust grows.
Reduces fights – Many arguments happen because people misunderstand each other. Clear communication fixes that.
Helps in work and study – Sharing ideas simply and asking good questions makes teamwork smooth.
Boosts confidence – Knowing you can express yourself makes social situations less scary.

Easy Tips to Improve Your Communication:
Listen more than you speak. Let the other person finish before you reply. Show you’re listening with a nod or a small “I see.”
Think before you speak. Ask yourself: Is it true? Is it kind? Is it necessary?
Keep it short and simple. Don’t use fancy words to impress. Say exactly what you mean.
Ask questions. If something isn’t clear, say “Can you explain that again?” instead of guessing.
Pay attention to feelings. Notice your own emotions and the other person’s. If someone looks upset, you might soften your tone or ask if they’re okay.
Practice empathy – Try to see things from the other person’s point of view. That makes your response more thoughtful.` },
        { title: 'AI Project Cycle', content: `The AI Project Cycle is a step-by-step method used to build useful AI solutions. It helps students move from a real-world problem to a working model in an organized way.

1. Problem Scoping:
Identify the problem, users, goals, constraints, and expected outcome. A good problem statement should clearly explain what needs to be solved and why it matters.

2. Data Acquisition:
Collect relevant data from reliable sources such as surveys, sensors, public datasets, images, text, audio, or records. Data should be accurate, sufficient, and collected ethically.

3. Data Exploration:
Study the data using tables, charts, graphs, and summaries. This step helps find patterns, missing values, unusual entries, and relationships between variables.

4. Modelling:
Choose an algorithm and train the model using data. The model learns patterns and uses them to make predictions or classifications.

5. Evaluation:
Test the model to check whether it performs well. Evaluation helps decide if the model is accurate, fair, reliable, and ready for improvement or deployment.` },
        { title: 'Neural Networks Basics', content: `Neural networks are AI models inspired by the way the human brain processes information. They are made of small processing units called neurons, arranged in layers.

Important terms:
A neuron receives inputs, applies weights, adds bias, and produces an output.
An activation function decides whether the neuron should pass information forward.
An input layer receives the data, hidden layers process patterns, and an output layer gives the final answer.
Forward propagation is the movement of data from input to output.
Training means adjusting weights so the model makes fewer mistakes over time.

Simple example:
For image recognition, the input may be pixel values. The hidden layers learn edges, shapes, and features. The output layer may predict whether the image contains a cat, dog, car, or person.

Use cases:
Neural networks power speech recognition, translation, image classification, handwriting recognition, chatbots, and recommendation systems.` },
        { title: 'AI Ethics', content: `AI ethics means using Artificial Intelligence in a responsible, fair, transparent, and safe manner. Since AI affects real people, students must understand the risks as well as the benefits.

Major concerns:
Bias: If training data is unfair or incomplete, the AI system may produce unfair results.
Privacy: AI systems often use personal data, so data must be protected and collected with consent.
Transparency: Users should understand when AI is being used and how important decisions are made.
Accountability: People and organizations must take responsibility for AI decisions.
Security: AI systems should be protected from misuse, hacking, and harmful manipulation.

Responsible AI practices:
Use diverse and reliable data, test models carefully, avoid collecting unnecessary personal information, explain results wherever possible, and keep humans involved in important decisions.

Ethical AI is not only about building smart systems. It is about building systems that help people safely and fairly.` }
    ],
    '9-it': [
        { title: 'Digital Documentation', content: `Digital documentation means creating, editing, formatting, storing, and sharing documents using word processing software such as LibreOffice Writer, MS Word, or Google Docs.

Main skills:
Create a new document, save it with a proper file name, open existing files, and export documents when needed.
Format text using font style, size, color, bold, italic, underline, alignment, line spacing, and indentation.
Use page settings such as margins, orientation, page size, headers, footers, and page numbers.
Insert tables, images, shapes, symbols, hyperlinks, and lists to make information clear.
Use styles for headings and paragraphs so the document looks consistent.

Good document habits:
Use meaningful headings, keep formatting consistent, proofread spelling and grammar, and organize content so readers can scan it easily.` },
        { title: 'Electronic Spreadsheet', content: `An electronic spreadsheet is used to store, calculate, organize, and analyze data in rows and columns. Common spreadsheet tools include LibreOffice Calc, MS Excel, and Google Sheets.

Basic concepts:
A worksheet contains rows, columns, and cells. Each cell has an address such as A1 or C5.
Data can be text, numbers, dates, formulas, or functions.
Formulas begin with an equal sign, such as =A1+B1.
Functions are ready-made formulas such as SUM, AVERAGE, MIN, MAX, and COUNT.

Useful skills:
Enter and edit data, adjust row height and column width, format cells, apply borders, use formulas, copy formulas using fill handle, and create charts.

Why spreadsheets are useful:
They help manage marksheets, attendance records, budgets, surveys, inventories, and simple reports. Charts make data easier to understand visually.` },
        { title: 'Digital Presentation', content: `Digital presentations help communicate ideas using slides. A good presentation is clear, well-structured, and visually balanced.

Main parts:
A slide can contain title text, bullet points, images, charts, tables, audio, video, and shapes.
Themes and templates provide a consistent design.
Slide layouts help arrange content properly.
Transitions control how one slide changes to the next.
Animations control how individual objects appear or move.
Speaker notes help the presenter remember key points.

Good presentation practices:
Keep slides simple, use short points, choose readable fonts, maintain contrast, use relevant images, avoid too many animations, and rehearse before presenting.

Common uses:
Class projects, business reports, awareness campaigns, product ideas, lesson explanations, and event introductions.` },
        { title: 'Internet and Web', content: `The Internet is a global network of connected computers and devices. The World Wide Web is a service on the Internet that lets users access websites through browsers.

Important terms:
A browser is software used to open websites, such as Chrome, Edge, Firefox, or Safari.
A search engine helps find information online.
A URL is the address of a webpage.
Email is used to send digital messages and files.
Cloud services help store and share files online.

Online safety:
Use strong passwords, do not share personal information with unknown people, avoid suspicious links, check website addresses, log out on shared devices, and report harmful content.

Responsible digital communication:
Be polite, avoid spreading fake news, respect privacy, give credit to sources, and think before posting anything online.` }
    ],
    '10': [
        { title: 'Advanced AI Concepts', content: `Advanced AI builds on basic machine learning and helps students understand how different learning methods solve different types of problems.

Supervised learning:
The model learns from labelled data. Each example has an input and a correct answer. Examples include predicting marks, classifying emails as spam or not spam, and identifying disease from symptoms.

Unsupervised learning:
The model works with unlabelled data and finds hidden patterns or groups. Examples include customer grouping, topic grouping, and pattern discovery.

Reinforcement learning:
An agent learns by taking actions and receiving rewards or penalties. It is used in games, robotics, traffic control, and automated decision systems.

Model improvement:
Hyperparameters are settings chosen before training, such as learning rate or number of layers. Tuning them can improve model performance.

Deployment:
Deployment means making a trained model available for real users through an app, website, device, or service.` },
        { title: 'Natural Language Processing', content: `Natural Language Processing, or NLP, is a branch of AI that helps computers understand, process, and generate human language.

Core tasks:
Tokenization breaks text into smaller units such as words or sentences.
Text cleaning removes unnecessary symbols, repeated spaces, and irrelevant content.
Sentiment analysis identifies whether text is positive, negative, or neutral.
Text classification groups text into categories such as news, sports, education, or spam.
Chatbots use NLP to understand user questions and respond meaningfully.

Modern NLP:
Transformer models improved language understanding by paying attention to context. Models such as BERT and GPT can handle tasks like summarization, translation, question answering, and content generation.

Real-life uses:
Search engines, voice assistants, grammar tools, translation apps, customer support bots, automatic captions, and document summarizers.` },
        { title: 'Computer Vision', content: `Computer Vision is the field of AI that enables machines to understand images and videos. It helps computers identify objects, faces, text, scenes, and activities.

Common tasks:
Image classification predicts the category of an image.
Object detection finds and locates objects inside an image.
Face recognition identifies or verifies a person.
Optical Character Recognition, or OCR, reads printed or handwritten text from images.
Image segmentation separates an image into meaningful parts.

How it works:
Images are made of pixels. Computer vision models learn patterns such as edges, colors, shapes, textures, and object parts. Convolutional Neural Networks, or CNNs, are commonly used for image tasks.

Applications:
Medical imaging, self-driving vehicles, attendance systems, quality checking in factories, traffic monitoring, agriculture, security cameras, and document scanning.` },
        { title: 'AI Evaluation', content: `AI evaluation means checking how well an AI model performs on new data. Evaluation is important because a model that performs well during training may still make mistakes in real situations.

Confusion matrix:
A confusion matrix compares actual answers with predicted answers. It includes true positives, true negatives, false positives, and false negatives.

Key metrics:
Accuracy shows the overall percentage of correct predictions.
Precision tells how many predicted positive results were actually correct.
Recall tells how many actual positive cases the model successfully found.
F1 score balances precision and recall.

Good evaluation habits:
Use separate training and testing data, test on enough examples, check performance for different groups, and study mistakes carefully.

Why it matters:
Evaluation helps improve models, reduce errors, compare algorithms, and decide whether an AI system is reliable enough to use.` }
    ],
    '10-it': [
        { title: 'Digital Documentation Advanced', content: `Advanced digital documentation focuses on creating professional, organized, and reusable documents.

Advanced features:
Styles allow headings, paragraphs, and lists to be formatted consistently.
Templates provide a ready-made structure for repeated document types.
Table of contents can be generated from heading styles.
Mail merge creates personalized letters, certificates, labels, or emails using a data source.
Track changes and comments help review and collaborate on documents.
Headers, footers, page numbers, footnotes, and captions improve document structure.

Practical uses:
Project reports, notices, resumes, certificates, newsletters, question papers, and official letters.

Best practices:
Plan the document structure, use styles instead of manual formatting, keep images optimized, proofread content, and export final documents as PDF when sharing.` },
        { title: 'Electronic Spreadsheet Advanced', content: `Advanced spreadsheets are used for deeper calculation, analysis, reporting, and decision-making.

Important tools:
Relative and absolute cell references help copy formulas correctly.
Functions such as IF, COUNTIF, SUMIF, AVERAGEIF, ROUND, and VLOOKUP help solve practical problems.
Sorting arranges data in order.
Filtering displays only records that match chosen conditions.
Conditional formatting highlights important values automatically.
Charts and graphs convert data into visual reports.

Data analysis examples:
Prepare mark sheets, calculate grades, track expenses, compare sales, manage attendance, and summarize survey responses.

Good spreadsheet habits:
Use clear headings, avoid unnecessary blank rows, check formulas, format numbers correctly, and protect important sheets when needed.` },
        { title: 'Database Management System', content: `A Database Management System, or DBMS, is software used to store, organize, manage, and retrieve data efficiently.

Basic concepts:
A database is a collection of related data.
A table stores data in rows and columns.
A field is a column, such as Name, Roll No, or Marks.
A record is a row containing complete information about one item.
A primary key uniquely identifies each record.

DBMS objects:
Tables store data.
Queries search, filter, and calculate data.
Forms provide an easy interface for data entry.
Reports present data in a printable format.

Advantages:
DBMS reduces duplication, improves accuracy, supports faster searching, allows better security, and helps multiple users manage data systematically.

Examples:
Student records, library systems, hospital records, banking systems, inventory management, and online booking systems.` },
        { title: 'Web Applications and Security', content: `Web applications are programs that run in a browser and use the Internet to provide services. Examples include online banking, email, learning platforms, shopping websites, and cloud storage.

Web application basics:
A client is the user's browser or device.
A server stores data and processes requests.
Web services allow applications to communicate with each other.
Login systems help identify users.
Cloud platforms make services available from anywhere.

Cyber safety:
Use strong and unique passwords, enable two-factor authentication, avoid unknown downloads, check HTTPS, do not share OTPs, update software regularly, and be careful with public Wi-Fi.

Common threats:
Phishing tricks users into revealing information.
Malware can damage files or steal data.
Identity theft misuses personal information.
Weak passwords make accounts easy to attack.

Digital responsibility:
Protect your digital footprint, respect others online, report cyberbullying, and use technology legally and ethically.` }
    ]
};
const videosData = {
    '9': [
        { title: 'AI Domains', youtubeId: '3Dt5Vw4W1aE' },
        { title: 'Machine Learning Intro', youtubeId: 'ukzFI9rgwfU' },
        { title: 'Python for AI', youtubeId: 'ZDa-Z5JzLYM' }
    ],
    '9-it': [
        { title: 'Class 9 IT Digital Documentation', youtubeId: 'mU6anWqZJcc' },
        { title: 'Spreadsheet Basics', youtubeId: 'rwbho0CgEAE' },
        { title: 'Presentation Basics', youtubeId: 'XF34-Wu6qWU' }
    ],
    '10': [
        { title: 'Deep Learning Basics', youtubeId: 'gZmobeGL0Yg' },
        { title: 'AI Applications', youtubeId: 'oV74Najm6Nc' },
        { title: 'Data Science', youtubeId: 'X3paOmJd3mA' }
    ],
    '10-it': [
        { title: 'Class 10 IT Digital Documentation', youtubeId: 'mU6anWqZJcc' },
        { title: 'Database Management System', youtubeId: 'HXV3zeQKqGY' },
        { title: 'Cyber Safety Basics', youtubeId: 'inWWhr5tnEA' }
    ]
};

const classLabels = {
    '9': 'Class 9 AI',
    '9-it': 'Class 9 IT',
    '10': 'Class 10 AI',
    '10-it': 'Class 10 IT'
};

function createNoteSlug(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function getNoteLink(classId, note) {
    return `#notes/${classId}/${createNoteSlug(note.title)}`;
}

function getNoteFromHash(hash) {
    const match = hash.match(/^#notes\/([^/]+)\/([^/]+)$/);
    if (!match) return null;

    const classId = match[1];
    const slug = match[2];
    const notes = notesData[classId] || [];
    const note = notes.find((item) => createNoteSlug(item.title) === slug);

    return note ? { classId, note } : null;
}

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
        <button className={`class-btn ${currentClass === '9-it' ? 'active' : ''}`} onClick={() => setCurrentClass('9-it')}>
            <i className="fas fa-keyboard"></i> Class 9 IT
        </button>
        <button className={`class-btn ${currentClass === '10' ? 'active' : ''}`} onClick={() => setCurrentClass('10')}>
            <i className="fas fa-brain"></i> Class 10 AI
        </button>
        <button className={`class-btn ${currentClass === '10-it' ? 'active' : ''}`} onClick={() => setCurrentClass('10-it')}>
            <i className="fas fa-laptop-code"></i> Class 10 IT
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

const NotesPanel = ({ notes, searchQuery, currentClass }) => {
    if (notes.length === 0) return <div style={{ textAlign: 'center', padding: '2rem' }}>No notes found for "{searchQuery}"</div>;
    return (
        <>
            <div className="card-grid">
                {notes.map((note, idx) => (
                    <div className="info-card" key={idx}>
                        <i className="fas fa-file-alt" style={{ fontSize: '2rem', color: '#f97316' }}></i>
                        <h3>{note.title}</h3>
                        <p>{note.content.substring(0, 80)}...</p>
                        <a className="btn-glass" href={getNoteLink(currentClass, note)}><i className="fas fa-book-open"></i> Read More</a>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button className="btn-glass" onClick={() => window.open('https://meet.google.com/', '_blank')}><i className="fab fa-google"></i> Join Live Class</button>
            </div>
        </>
    );
};

const LessonPage = ({ classId, note, setCurrentClass, clearLesson }) => {
    const paragraphs = note.content.split('\n\n').filter(Boolean);

    return (
        <article className="lesson-page">
            <button className="btn-glass back-btn" onClick={() => { setCurrentClass(classId); clearLesson(); }}>
                <i className="fas fa-arrow-left"></i> Back to Notes
            </button>
            <div className="lesson-header">
                <p className="lesson-kicker">{classLabels[classId]}</p>
                <h2>{note.title}</h2>
            </div>
            <div className="lesson-body">
                {paragraphs.map((paragraph, index) => {
                    const lines = paragraph.split('\n');
                    const firstLine = lines[0].trim();
                    const rest = lines.slice(1).join('\n');

                    if (firstLine.endsWith(':') && rest) {
                        return (
                            <section className="lesson-section" key={index}>
                                <h3>{firstLine}</h3>
                                <p>{rest}</p>
                            </section>
                        );
                    }

                    return <p key={index}>{paragraph}</p>;
                })}
            </div>
        </article>
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
                <span className="footer-follow">Follow Us</span>
                <a className="footer-link social-link" href="https://www.instagram.com/techlearners.in/" target="_blank" rel="noopener noreferrer" aria-label="Follow Tech Learners on Instagram"><i className="fab fa-instagram"></i></a>
                <a className="footer-link social-link" href="https://www.facebook.com/techlearners.in" target="_blank" rel="noopener noreferrer" aria-label="Follow Tech Learners on Facebook"><i className="fab fa-facebook-f"></i></a>
                <a className="footer-link social-link" href="https://wa.me/918738943773" target="_blank" rel="noopener noreferrer" aria-label="Message Tech Learners on WhatsApp"><i className="fab fa-whatsapp"></i></a>
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
    const [hash, setHash] = React.useState(window.location.hash);
    React.useEffect(() => {
        const handleHashChange = () => setHash(window.location.hash);
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const selectedLesson = getNoteFromHash(hash);
    const clearLesson = () => {
        window.history.pushState('', document.title, window.location.pathname + window.location.search);
        setHash('');
    };
    const notesList = notesData[currentClass];
    const videosList = videosData[currentClass];
    const fuseNotes = React.useMemo(() => new Fuse(notesList, { keys: ['title', 'content'], threshold: 0.3 }), [notesList]);
    const fuseVideos = React.useMemo(() => new Fuse(videosList, { keys: ['title'], threshold: 0.3 }), [videosList]);
    const filteredNotes = searchQuery.trim() === '' ? notesList : fuseNotes.search(searchQuery).map(r => r.item);
    const filteredVideos = searchQuery.trim() === '' ? videosList : fuseVideos.search(searchQuery).map(r => r.item);
    return (
        <div className="glass-home">
            <Header />
            {selectedLesson ? (
                <LessonPage classId={selectedLesson.classId} note={selectedLesson.note} setCurrentClass={setCurrentClass} clearLesson={clearLesson} />
            ) : (
                <>
                    <ClassSelector currentClass={currentClass} setCurrentClass={setCurrentClass} />
                    <SearchBar query={searchQuery} setQuery={setSearchQuery} />
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '1rem 0' }}>
                        <button className={`tab ${currentTab === 'notes' ? 'active' : ''}`} onClick={() => setCurrentTab('notes')}><i className="fas fa-sticky-note"></i> Notes</button>
                        <button className={`tab ${currentTab === 'videos' ? 'active' : ''}`} onClick={() => setCurrentTab('videos')}><i className="fas fa-play-circle"></i> Video Lectures</button>
                    </div>
                    {currentTab === 'notes' ? <NotesPanel notes={filteredNotes} searchQuery={searchQuery} currentClass={currentClass} /> : <VideosPanel videos={filteredVideos} searchQuery={searchQuery} />}
                </>
            )}
            <Footer />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
