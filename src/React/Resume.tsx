import React from 'react';
import './Resume.css';

interface ResumeProps {
  onClose: () => void;
}

const Resume: React.FC<ResumeProps> = ({ onClose }) => {
  return (
    <div className="resume-container">
      <div className="resume-content">
        <div className="resume-header">
          <h1>Kanishk Reddy</h1>
          <p className="location">Hyderabad, Telangana, India</p>
          <div className="contact-info">
            <a href="mailto:kanishkreddy3813@gmail.com">kanishkreddy3813@gmail.com</a>
            <span>|</span>
            <a href="tel:7286971004">(+91) 7286971004</a>
          </div>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/kanishk-reddy-8161a122a/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span>|</span>
            <a href="https://github.com/Kanishk3813" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>

        <section className="resume-section">
          <h2>Education</h2>
          <div className="section-content">
            <div className="subheading">
              <div>
                <h3>SRM Institute of Science and Technology</h3>
                <p>Bachelor of Engineering in Computer Science (CGPA: 8.6/10)</p>
              </div>
              <div className="date-location">
                <p>2022 – 2026</p>
                <p>Chennai, India</p>
              </div>
            </div>
            <div className="subheading">
              <div>
                <h3>Sri Chaitanya Jr. College</h3>
                <p>XII Board Percentage - 79.0 %</p>
              </div>
              <div className="date-location">
                <p>2020 – 2022</p>
                <p>Hyderabad, India</p>
              </div>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <h2>Professional Experience</h2>
          <div className="section-content">
            <div className="subheading">
              <div>
                <h3>Full Stack Developer Intern</h3>
                <p>TaskLabs</p>
              </div>
              <div className="date-location">
                <p>Jun 2024 – Dec 2024</p>
                <p>Remote</p>
              </div>
            </div>
            <ul>
              <li>Contributed to the development of core functionalities for TaskLabs, enhancing user experience and platform stability.</li>
              <li>Implemented key features and optimizations, leading to a 30% improvement in system performance.</li>
              <li>Collaborated with the founding team to develop and execute product development roadmaps, resulting in a 25% faster time-to-market and a 15% increase in user acquisition.</li>
            </ul>

            <div className="subheading">
              <div>
                <h3>Full Stack Developer</h3>
                <p>Service to Mankind (STM)</p>
              </div>
              <div className="date-location">
                <p>Apr 2024 – Jun 2024</p>
                <p>Remote</p>
              </div>
            </div>
            <ul>
              <li>Engineered and launched a donation feature on the website, resulting in a 50% increase in donations.</li>
              <li>Administered and modernized the tech stack, enhancing system security and operational efficiency.</li>
              <li>Collaborated with cross-functional teams to deliver high-quality open-source software solutions.</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2>Notable Projects</h2>
          <div className="section-content">
            <div className="project">
              <h3><a href="https://www.npteloverflow.in/">NptelOverflow</a> | <em>NextJs, Typescript, Javascript, Firebase, Python</em></h3>
              <ul>
                <li>Developed a Q&A platform focused on NPTEL courses, providing a centralized space for users to access, answer, and vote on course-related questions, increasing user engagement by 40%.</li>
                <li>Implemented a forum for open discussions and customizable user profiles, resulting in a 30% increase in user retention through enhanced community interaction and personalized experiences.</li>
                <li>Boosted user contributions by 35% through a leaderboard system, encouraging competitive participation.</li>
              </ul>
            </div>

            <div className="project">
              <h3><a href="https://github.com/Kanishk3813/Intel_Sentiment_Analysis">Review Analyzer</a> | <em>React, Python, Flask, Axios, Matplotlib</em></h3>
              <ul>
                <li>Developed and trained a deep learning model (BERT) for sentiment analysis of reviews, classifying them into positive, neutral, or negative categories.</li>
                <li>Implemented features like word cloud generation and past trends visualization to help businesses identify common themes and track changes in customer perception.</li>
                <li>Enabled CSV upload for batch processing and provided downloadable reports in JSON format for detailed analysis.</li>
              </ul>
            </div>

            <div className="project">
              <h3><a href="https://github.com/">Dark Pattern Buster</a> | <em>HTML, CSS, JavaScript, Python</em></h3>
              <ul>
                <li>The Dark Pattern Buster Chrome extension is a powerful tool designed to combat deceptive design tactics.</li>
                <li>Integrated dark pattern keyword highlighting and informative tooltips, boosting user reporting and site blacklisting accuracy to 97%.</li>
                <li>Implemented website safety score display function utilizing APIs for enhanced user security.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <h2>Technical Skills</h2>
          <div className="section-content">
            <ul className="skills-list">
              <li><strong>Languages:</strong> C/C++, Python, JavaScript, HTML, CSS, TypeScript</li>
              <li><strong>Frameworks & Libraries:</strong> Tailwind CSS, NextJs, Bootstrap, Flask, Numpy, Pandas, Matplotlib, ReactJs, Tkinter, Streamlit</li>
              <li><strong>Tools:</strong> Jupyter Notebook, VScode, Github, Git, Google Colab, AWS</li>
              <li><strong>Databases:</strong> MySQL, PostgreSQL</li>
              <li><strong>Machine Learning/Deep Learning:</strong> TensorFlow, PyTorch, scikit-learn, Keras, Librosa, Computer Vision</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2>Certifications</h2>
          <div className="section-content">
            <ul>
              <li>Introduction to Salesforce Lightning Web Component</li>
              <li>Supervised Machine Learning - Coursera</li>
              <li>Java, Computer Architecture, DAA - NPTEL</li>
              <li>Cloud Foundations & Architecting – AWS Academy</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2>Extra-Curricular Activities</h2>
          <div className="section-content">
            <ul>
              <li>Engaged as an active member across multiple technical clubs, organizing various events and hackathons.</li>
              <li>Cricket enthusiast with a passion for gaming and anime during downtime.</li>
            </ul>
          </div>
        </section>
      </div>
      <button className="close-button" onClick={onClose}>x</button>
    </div>
  );
};

export default Resume;