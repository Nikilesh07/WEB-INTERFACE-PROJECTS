import './App.css'

const hobbies = [
  {
    name: 'Photography',
    description: 'Capturing everyday moments and finding new perspectives through the lens.',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85',
    alt: 'Camera resting on a table',
  },
  {
    name: 'Reading',
    description: 'Exploring new ideas and stories that make the world feel a little bigger.',
    image:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=85',
    alt: 'Open book with glasses and a cup of coffee',
  },
  {
    name: 'Cooking',
    description: 'Trying new recipes, learning new techniques, and sharing good food with others.',
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=85',
    alt: 'Person preparing vegetables in a kitchen',
  },
  {
    name: 'Music',
    description: 'Listening to favorite artists and playing songs that bring energy to the day.',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=85',
    alt: 'Headphones beside a music player',
  },
]

function App() {
  return (
    <main className="gallery-page">
      <header className="gallery-header">
        <p className="eyebrow">Student portfolio</p>
        <h1>Student Hobby Gallery</h1>
        <p className="intro">
          A few things I enjoy doing beyond the classroom.
        </p>
      </header>

      <section className="hobby-grid" aria-label="Student hobbies">
        {hobbies.map((hobby) => (
          <article className="hobby-card" key={hobby.name}>
            <img src={hobby.image} alt={hobby.alt} loading="lazy" />
            <div className="hobby-card-content">
              <h2>{hobby.name}</h2>
              <p>{hobby.description}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
