import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

const fall2025 = [
  { code: 'BU.120.601', title: 'Business Communication' },
  { code: 'BU.330.740', title: 'Large Scale Computing on the Cloud' },
  { code: 'BU.330.770', title: 'Database Management' },
  { code: 'BU.330.775', title: 'Machine Learning: Design and Deployment' },
  { code: 'BU.330.780', title: 'Data Science and Business Intelligence' },
  { code: 'BU.350.620', title: 'Digital Transformation of Business' },
  { code: 'BU.510.601', title: 'Statistical Analysis' },
  { code: 'BU.520.601', title: 'Business Analytics' },
]

const spring2026 = [
  { code: 'BU.131.601', title: 'Business Leadership and Human Values' },
  { code: 'BU.300.700', title: 'Developing Internet Systems and Services' },
  { code: 'BU.330.735', title: 'Responsible AI' },
  { code: 'BU.330.760', title: 'Generative AI' },
  { code: 'BU.350.790', title: 'IT Consulting Lab Practicum' },
  { code: 'BU.410.620', title: 'Marketing Management' },
  { code: 'BU.520.710', title: 'AI Essentials for Business' },
  { code: 'BU.520.750', title: 'AI-Driven Sequential Decision Making' },
]

const vit = [
  {
    year: '2021 – 2022',
    courses: [
      'Environmental Sciences',
      'Programming in C',
      'Basic Electrical and Electronics Engineering',
      'Business Communication and Value Science I',
      'Foundation English II',
      'Ethics and Values',
      'Discrete Mathematics',
      'Probability and Statistics',
      'Modern Physics',
      'Object Oriented Programming',
      'Computer Architecture and Organization',
      'Programming in Python',
      'Engineering Chemistry',
      'Business Communication and Value Science II',
      'Technical English I',
      'Linear Algebra',
      'Data Science and Statistical Modelling',
    ],
  },
  {
    year: '2022 – 2023',
    courses: [
      'Data Structures and Algorithms',
      'Software Engineering Methodologies',
      'Principles of Operating Systems',
      'Operations Research',
      'Computational Statistics',
      'Business Communication and Value Science III',
      'Financial and Cost Accounting',
      'Fundamentals of Management',
      'Database Systems',
      'Formal Languages and Automata Theory',
      'Design Thinking',
      'Computer Networks',
      'Business Communication and Value Science IV',
      'Industrial Psychology',
      'Financial Management',
    ],
  },
  {
    year: '2023 – 2024',
    courses: [
      'Information Security',
      'Design and Analysis of Algorithms',
      'Artificial Intelligence',
      'Usability Design of Software Applications',
      'Francais Quotidien',
      'Marketing Research and Marketing Management',
      'iOS Platform',
      'Industrial Project',
      'IT Project Management',
      'Cryptology and Analysis',
      'JAVA Programming',
      'Engineering Economics',
      'Introduction to Innovation, IP Management and Entrepreneurship',
      'Services Science and Service Operational Management',
      'Forests and Their Management',
    ],
  },
]

function JHUCourseList({ isMobile }) {
  const semesters = [
    { label: 'Fall 2025', status: 'completed', courses: fall2025 },
    { label: 'Spring 2026', status: 'in-progress', courses: spring2026 },
  ]
  return (
    <div>
      {semesters.map((sem, si) => (
        <div key={sem.label}>
          {/* Semester header */}
          <div style={{
            padding: '16px 0 10px',
            borderBottom: '1px solid #E8E4DA',
            marginBottom: '4px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{ width: '3px', height: '16px', background: '#0891B2', borderRadius: '2px' }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0891B2', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {sem.label}
            </span>
            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>· {sem.courses.length} courses</span>
          </div>

          {sem.courses.map((course, i) => (
            <motion.div
              key={course.code}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '13px 0 13px 16px',
                borderBottom: '1px solid #F3F0E8',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                {!isMobile && (
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    color: '#9CA3AF',
                    fontWeight: 500,
                    minWidth: '96px',
                    letterSpacing: '0.03em',
                  }}>
                    {course.code}
                  </span>
                )}
                <span style={{ fontSize: '14px', color: '#1F2937', fontWeight: 400, lineHeight: 1.4 }}>
                  {course.title}
                </span>
              </div>
              <span style={{
                padding: '3px 10px',
                borderRadius: '100px',
                fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                background: sem.status === 'completed' ? 'rgba(16,185,129,0.1)' : 'rgba(8,145,178,0.1)',
                color: sem.status === 'completed' ? '#059669' : '#0891B2',
                border: `1px solid ${sem.status === 'completed' ? 'rgba(16,185,129,0.2)' : 'rgba(8,145,178,0.2)'}`,
                flexShrink: 0,
              }}>
                {sem.status === 'completed' ? 'Done' : 'In Progress'}
              </span>
            </motion.div>
          ))}

          {si < semesters.length - 1 && <div style={{ height: '8px' }} />}
        </div>
      ))}
    </div>
  )
}

function NUSCourseList({ isMobile }) {
  return (
    <div>
      {/* Programme header */}
      <div style={{
        padding: '20px 0 16px',
        borderBottom: '1px solid #E8E4DA',
        marginBottom: '4px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#0891B2', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>
              NUS Singapore Summer School
            </p>
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#111218' }}>
              Big Data Analytics using Deep Learning
            </p>
            <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '3px' }}>
              8 June 2024 – 29 June 2024 · School of Computing, National University of Singapore
            </p>
          </div>
          <span style={{
            padding: '6px 16px',
            borderRadius: '100px',
            fontSize: '12px', fontWeight: 700,
            background: 'rgba(16,185,129,0.1)',
            color: '#059669',
            border: '1px solid rgba(16,185,129,0.2)',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}>
            Grade A
          </span>
        </div>
      </div>

      {/* Course modules */}
      {nusCourses.map((title, i) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35, delay: i * 0.02 }}
          style={{
            padding: '13px 0',
            borderBottom: '1px solid #F3F0E8',
          }}
        >
          <span style={{ fontSize: '14px', color: '#1F2937', fontWeight: 400, lineHeight: 1.4 }}>
            {title}
          </span>
        </motion.div>
      ))}

      {/* Evaluators card */}
      <div style={{
        marginTop: '20px',
        padding: '20px 24px',
        background: 'rgba(8,145,178,0.05)',
        border: '1px solid rgba(8,145,178,0.18)',
        borderRadius: '12px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '16px',
      }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#0891B2', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
            Evaluated by
          </p>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#111218' }}>Dr. Tan Wee Kek</p>
          <p style={{ fontSize: '13px', color: '#6B7280' }}>Associate Professor</p>
          <p style={{ fontSize: '13px', color: '#6B7280' }}>School of Computing, NUS</p>
        </div>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#0891B2', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
            &nbsp;
          </p>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#111218' }}>Dr. Manoranjan Dash</p>
          <p style={{ fontSize: '13px', color: '#6B7280' }}>Senior Data Scientist</p>
          <p style={{ fontSize: '13px', color: '#6B7280' }}>School of Computing, NUS</p>
        </div>
      </div>

      {/* Grade summary */}
      <div style={{
        marginTop: '16px',
        padding: '14px 20px',
        background: 'rgba(16,185,129,0.06)',
        border: '1px solid rgba(16,185,129,0.2)',
        borderRadius: '10px',
        display: 'flex', alignItems: 'center', gap: '24px',
        flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: '13px', color: '#6B7280' }}>
          <strong style={{ color: '#059669' }}>Grade:</strong> A
        </span>
        <span style={{ fontSize: '13px', color: '#6B7280' }}>
          <strong style={{ color: '#059669' }}>Programme:</strong> Big Data Analytics using Deep Learning
        </span>
        <span style={{ fontSize: '13px', color: '#6B7280' }}>
          <strong style={{ color: '#059669' }}>Period:</strong> June 2024
        </span>
      </div>
    </div>
  )
}

function VITCourseList() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {vit.map((group, gi) => (
        <div key={group.year}>
          {/* Year header */}
          <div style={{
            padding: '16px 0 10px',
            borderBottom: '1px solid #E8E4DA',
            marginBottom: '4px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{ width: '3px', height: '16px', background: '#B5860D', borderRadius: '2px' }} />
            <span style={{
              fontSize: '12px', fontWeight: 700,
              color: '#B5860D', letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              {group.year}
            </span>
            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>· {group.courses.length} courses</span>
          </div>

          {group.courses.map((title, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.02 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '13px 0 13px 16px',
                borderBottom: '1px solid #F3F0E8',
                gap: '16px',
              }}
            >
              <span style={{ fontSize: '14px', color: '#1F2937', fontWeight: 400, lineHeight: 1.4, flex: 1 }}>
                {title}
              </span>
              <span style={{
                padding: '3px 10px',
                borderRadius: '100px',
                fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                background: 'rgba(16,185,129,0.1)',
                color: '#059669',
                border: '1px solid rgba(16,185,129,0.2)',
                flexShrink: 0,
              }}>
                Done
              </span>
            </motion.div>
          ))}

          {gi < vit.length - 1 && <div style={{ height: '8px' }} />}
        </div>
      ))}

      {/* GPA summary */}
      <div style={{
        marginTop: '20px',
        padding: '14px 20px',
        background: 'rgba(16,185,129,0.06)',
        border: '1px solid rgba(16,185,129,0.2)',
        borderRadius: '10px',
        display: 'flex', alignItems: 'center', gap: '24px',
        flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: '13px', color: '#6B7280' }}>
          <strong style={{ color: '#059669' }}>Total Credits:</strong> 120.0
        </span>
        <span style={{ fontSize: '13px', color: '#6B7280' }}>
          <strong style={{ color: '#059669' }}>GPA:</strong> 3.19
        </span>
        <span style={{ fontSize: '13px', color: '#6B7280' }}>
          <strong style={{ color: '#059669' }}>Degree:</strong> B.E. CSE (Business Systems), 2021–2025
        </span>
      </div>
    </div>
  )
}

const nusCourses = [
  'Introduction to Data Analytics & Decision Models',
  'Exploratory Data Analysis & Data Visualization',
  'Data Querying & Statistical Summarization',
  'Descriptive Statistical Measures (Location, Dispersion, Shape)',
  'Measures of Association',
  'Simple & Multi Linear Regression',
  'Stepwise Regression & Categorical Variables',
  'Classification — Decision Trees, Bayesian Classifier, Logistic Regression',
  'Support Vector Machines & Maximal Margin Classifier',
  'Resampling Methods',
  'Clustering — K-means, K-medoids, Hierarchical Methods',
  'Association Rules, Apriori Algorithm & FP Growth',
  'Time Series Analysis',
  'Text Mining — Concepts, Process & Knowledge Extraction',
  'Artificial Neural Networks (ANN) & Backpropagation',
  'Convolutional Neural Networks (CNN)',
  'Recurrent Neural Networks (RNN), LSTM & GRU',
  'Generative AI — GANs, VAEs & Transformers',
  'Reinforcement Learning — DP, Monte Carlo & TD Methods',
]

const tabs = [
  { key: 'jhu', label: 'Johns Hopkins', sub: 'M.S. ISAI · 16 courses' },
  { key: 'vit', label: 'VIT Vellore', sub: 'Undergrad · 47 courses' },
  { key: 'nus', label: 'NUS Singapore', sub: 'GAIP · Summer 2024 · Grade A' },
]

export default function Coursework() {
  const [active, setActive] = useState('jhu')
  const isMobile = useIsMobile()

  return (
    <section id="coursework" style={{
      padding: isMobile ? '80px 20px' : '120px 40px',
      background: 'linear-gradient(180deg, #FAFAF8 0%, #F4F1EA 100%)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '56px' }}
        >
          <span className="section-label">06 — Coursework</span>
          <h2 className="font-display" style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 600, lineHeight: 1.05,
            letterSpacing: '-0.03em', color: '#111218',
            marginTop: '12px',
          }}>
            Coursework
          </h2>
          <p style={{ fontSize: '16px', color: '#6B7280', marginTop: '14px', maxWidth: '520px', lineHeight: 1.6 }}>
            Academic coursework across Johns Hopkins University, VIT Vellore, and NUS Singapore.
          </p>
        </motion.div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '40px', borderBottom: '1px solid #E8E4DA', overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              style={{
                padding: '14px 28px',
                background: 'transparent',
                border: 'none',
                borderBottom: active === tab.key ? '2.5px solid #0891B2' : '2.5px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <div style={{
                fontSize: '15px', fontWeight: 600,
                color: active === tab.key ? '#111218' : '#6B7280',
                transition: 'color 0.2s',
              }}>
                {tab.label}
              </div>
              <div style={{ fontSize: '12px', color: active === tab.key ? '#0891B2' : '#9CA3AF', marginTop: '2px' }}>
                {tab.sub}
              </div>
            </button>
          ))}
        </div>

        {/* Course list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{
              background: '#fff',
              border: '1px solid #F0EDE8',
              borderRadius: '16px',
              padding: isMobile ? '8px 16px' : '8px 32px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
            }}
          >
            {active === 'jhu' && <JHUCourseList isMobile={isMobile} />}
            {active === 'vit' && <VITCourseList />}
            {active === 'nus' && <NUSCourseList isMobile={isMobile} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
