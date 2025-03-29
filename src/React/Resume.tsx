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
          <h1>Ayush Tiwari</h1>
          <p className="location">Chennai, Tamil Nadu, India</p>
          <div className="contact-info">
            <a href="mailto:aayushtiwari071@gmail.com">aayushtiwari071@gmail.com</a>
            <span>|</span>
            <a href="tel:6306500300">6306500300</a>
          </div>
          <div className="social-links">
            <a href="https://linkedin.com/in/ayush-tiwari-538ab824b" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span>|</span>
            <a href="https://ayushtiwari.vercel.app" target="_blank" rel="noopener noreferrer">Portfolio</a>
            <span>|</span>
            <a href="https://github.com/aaayushh7" target="_blank" rel="noopener noreferrer">GitHub (50+ Projects)</a>
          </div>
        </div>

        <section className="resume-section">
          <h2>Education</h2>
          <div className="section-content">
            <div className="subheading">
              <div>
                <h3>SRM Institute of Science and Technology</h3>
                <p>Bachelor of Technology in Computer Science (CGPA: 8.55/10)</p>
              </div>
              <div className="date-location">
                <p>Aug 2022 – Jun 2026</p>
                <p>Chennai, India</p>
              </div>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <h2>Certifications</h2>
          <div className="section-content">
            <ul>
              <li>NPTEL – <a href="https://drive.google.com/file/d/1NEK0IxV8eMLZIK4zKv7ErTKQ_Nd43JAs/view?usp=drive_link">Programming in Java</a>, <a href="#">Introduction to Machine Learning</a></li>
              <li>Hackerrank – <a href="https://drive.google.com/file/d/1zOqjyuiO_wcyLAuPCrmY5KtdQe-ulwzE/view?usp=sharing">React Front-end Developer Test</a>, <a href="https://www.hackerrank.com/profile/at7257">Profile</a></li>
              <li>Cisco – <a href="https://drive.google.com/file/d/1RF8RbWn6SdCoJi-d340PN3tBB4BfIzzD/view?usp=drive_link">Introduction to IOT</a>, <a href="https://drive.google.com/file/d/1-VL_2E2w4JjZuBbZwm_R-WfwFz7XLD03/view?usp=drive_link">Networking Basics</a></li>
              <li>Oracle – <a href="https://drive.google.com/file/d/1XmqEEpSH_8kZTK5dyVJBtg8ot9AZRWhq/view?usp=drive_link">Become an OCI Foundations Associate (2024)</a></li>
              <li>Coursera – <a href="https://drive.google.com/file/d/1aI9I5IRNaS1IMkBYuvf2smynAqVdL8pn/view?usp=drive_link">Data Structures</a></li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2>Professional Experience</h2>
          <div className="section-content">
            <div className="subheading">
              <div>
                <h3>Software Engineer Intern</h3>
                <p>SRM Technologies</p>
              </div>
              <div className="date-location">
                <p>Mar 2024 – Nov 2024</p>
                <p>Chennai, India</p>
              </div>
            </div>
            <ul>
              <li>Developed scalable web applications using <strong>React.js</strong>, <strong>Next.js</strong>, and <strong>Tailwind CSS</strong>, achieving a 30% reduction in page load times.</li>
              <li>Implemented <strong>LangChain</strong> for AI-driven features, enhancing automation processes by 40%.</li>
              <li>Collaborated with cross-functional teams to deliver key features within strict deadlines.</li>
            </ul>

            <div className="subheading">
              <div>
                <h3>Research Intern</h3>
                <p>Samsung Prism</p>
              </div>
              <div className="date-location">
                <p>Mar 2024 – Dec 2024</p>
                <p>Chennai, India</p>
              </div>
            </div>
            <ul>
              <li>Conducted research on <strong>fine-tuning LLMs</strong> and <strong>BERT-based models</strong>.</li>
              <li>Prepared technical documentation for team-wide access, enhancing knowledge sharing among engineers.</li>
            </ul>

            <div className="subheading">
              <div>
                <h3>Web/App Development Head</h3>
                <p>CINTEL's Next-Gen AI</p>
              </div>
              <div className="date-location">
                <p>Aug 2023 – Jun 2024</p>
                <p>Chennai, India</p>
              </div>
            </div>
            <ul>
              <li>Led the development of full-stack applications using <strong>React.js</strong>, <strong>Next.js</strong>, <strong>MongoDB</strong>, and <strong>Framer</strong>, resulting in a 35% increase in user engagement.</li>
              <li>Directed a team of 5 developers to deliver features for 1K+ active users, focusing on scalability and security.</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2>Notable Projects</h2>
          <div className="section-content">
            <div className="project">
              <h3><a href="https://cravehub.store/">Quick-commerce Food Delivery App</a> | <em>React.js, Ionic Capacitor, Node.js, Express, MongoDB, Firebase</em></h3>
              <ul>
                <li>Developed and deployed a <strong>quick-commerce platform</strong> actively used in Potheri, launching in April.</li>
                <li>Built cross-platform <strong>Android and iOS apps</strong> using <strong>Ionic Capacitor</strong>, increasing order volume by 40%.</li>
                <li>Integrated <strong>real-time order tracking</strong> and <strong>geofencing</strong>, optimizing delivery efficiency.</li>
                <li>Designed an intuitive admin panel, reducing <strong>manual intervention</strong> and improving operational workflow.</li>
                <li><strong>Live Site:</strong> <a href="https://cravehub.store">cravehub.store</a></li>
              </ul>
            </div>

            <div className="project">
              <h3><a href="https://trackhub-at.vercel.app/">TrackHub</a> | <em>Next.js, TypeScript, Node.js, MongoDB, BrightData, NodeMailer</em></h3>
              <ul>
                <li>Developed an automated price tracking system for <strong>Amazon</strong> products, supporting 1000+ concurrent users, leading to a 35% increase in user retention.</li>
                <li>Implemented real-time email notifications for price drops, utilizing <strong>NodeMailer</strong> for scheduled alerts.</li>
                <li>Built a robust backend with <strong>Node.js</strong> and <strong>MongoDB</strong>, ensuring smooth data management and scalability.</li>
              </ul>
            </div>

            <div className="project">
              <h3><a href="https://github.com/aaayushh7/GuardianShe">GuardianShe</a> | <em>Java, Android Studio, GitHub API</em></h3>
              <ul>
                <li>Engineered a women safety application that activates SOS mode with a click, reducing emergency response times by 30%.</li>
                <li>Integrated intelligent detection of movement and real-time location tracking to improve safety and accuracy.</li>
              </ul>
            </div>

            <div className="project">
              <h3>Authenticheck | <em>WebRTC, Node.js, Express, Flask, TensorFlow.js</em></h3>
              <ul>
                <li>Developed a secure video conferencing platform with integrated <strong>real-time face detection</strong> for user verification.</li>
                <li>Enhanced video calls by adding <strong>eye-tracking</strong> and <strong>summary generation</strong> features, improving interview effectiveness.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <h2>Technical Skills</h2>
          <div className="section-content">
            <ul className="skills-list">
              <li><strong>Programming Languages:</strong> Java, Python, C++, JavaScript, TypeScript</li>
              <li><strong>Web Development:</strong> React.js, Next.js, Node.js, Express</li>
              <li><strong>Databases:</strong> MongoDB, MySQL, Redis</li>
              <li><strong>DevOps:</strong> Docker, Git, GitHub</li>
              <li><strong>Cloud:</strong> AWS, Firebase</li>
              <li><strong>Tools:</strong> Tailwind CSS, WebRTC, Framer</li>
            </ul>
          </div>
        </section>
      </div>
      <button className="close-button" onClick={onClose}>X</button>
    </div>
  );
};

export default Resume; 