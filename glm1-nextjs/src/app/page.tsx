import TerminalLoader from '@/components/TerminalLoader';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="command-center">
      <TerminalLoader />
      <Navigation />

      <main>
        {/* Agent Profile Section */}
        <section id="agent-profile" className="section agent-profile">
          <div className="container">
            <div className="profile-content">
              <div className="agent-info">
                <h1 className="agent-name neon-glow">DIGITAL FRAUD DETECTIVE</h1>
                <p className="agent-tagline">Specialized in Cybercrime Investigation & Digital Forensics</p>

                <div className="agent-story">
                  <p>
                    Operating at the intersection of cybersecurity and investigative expertise,
                    I specialize in uncovering sophisticated digital fraud schemes and protecting
                    organizations from emerging cyber threats.
                  </p>
                  <p>
                    With extensive experience in financial crime analysis, blockchain forensics,
                    and incident response, I bring a unique blend of technical prowess and
                    investigative acumen to every case.
                  </p>
                </div>

                <div className="skills-grid">
                  <div className="skill-category">
                    <h3>Technical Skills</h3>
                    <ul className="skill-list">
                      <li>Digital Forensics</li>
                      <li>Blockchain Analysis</li>
                      <li>Malware Analysis</li>
                      <li>Network Security</li>
                      <li>Cryptocurrency Tracing</li>
                    </ul>
                  </div>
                  <div className="skill-category">
                    <h3>Investigation</h3>
                    <ul className="skill-list">
                      <li>Financial Crime Analysis</li>
                      <li>Pattern Recognition</li>
                      <li>Risk Assessment</li>
                      <li>Incident Response</li>
                      <li>Expert Testimony</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="profile-visual">
                <div className="data-stream">
                  <div className="stream-line"></div>
                  <div className="stream-line"></div>
                  <div className="stream-line"></div>
                </div>

                <div className="status-panel">
                  <div className="status-item">
                    <span className="status-label">Status</span>
                    <span className="status-value active">ONLINE</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Cases Solved</span>
                    <span className="status-value">247</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Recovery Rate</span>
                    <span className="status-value">94%</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Response Time</span>
                    <span className="status-value">&lt;2hrs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Files Section */}
        <section id="case-files" className="section case-files">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">CASE FILES</h2>
              <div className="title-line"></div>
            </div>

            <div className="cases-grid">
              <div className="case-card">
                <div className="case-header">
                  <span className="case-id">CASE-2024-001</span>
                  <span className="case-status closed">CLOSED</span>
                </div>
                <h3 className="case-title">Cryptocurrency Exchange Breach</h3>
                <p className="case-summary">
                  Led investigation into $2.3M cryptocurrency theft from major exchange.
                  Traced funds through multiple blockchain transactions and coordinated with
                  international law enforcement for asset recovery.
                </p>
                <div className="case-tech">
                  <span className="tech-label">Technologies:</span>
                  <ul className="tech-list">
                    <li>Blockchain Analysis</li>
                    <li>Smart Contract Audit</li>
                    <li>Chain Hopping</li>
                    <li>Mixing Services</li>
                  </ul>
                </div>
                <div className="case-stats">
                  <div className="stat">
                    <span className="stat-label">Recovered</span>
                    <span className="stat-value">$1.8M</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Duration</span>
                    <span className="stat-value">72hrs</span>
                  </div>
                </div>
                <div className="case-outcome">
                  <span className="outcome-label">Resolution:</span>
                  <p className="outcome-text">
                    Successfully recovered 78% of stolen funds and identified the perpetrator
                    through advanced blockchain forensics.
                  </p>
                </div>
              </div>

              <div className="case-card">
                <div className="case-header">
                  <span className="case-id">CASE-2024-002</span>
                  <span className="case-status active">ACTIVE</span>
                </div>
                <h3 className="case-title">Corporate Email Compromise</h3>
                <p className="case-summary">
                  Investigating sophisticated BEC attack targeting financial department.
                  Attackers used AI-generated voice deepfakes to authorize $450K wire transfer
                    to fraudulent accounts.
                </p>
                <div className="case-tech">
                  <span className="tech-label">Technologies:</span>
                  <ul className="tech-list">
                    <li>Email Forensics</li>
                    <li>AI/ML Analysis</li>
                    <li>Domain Spoofing</li>
                    <li>Network Traffic</li>
                  </ul>
                </div>
                <div className="case-stats">
                  <div className="stat">
                    <span className="stat-label">At Risk</span>
                    <span className="stat-value">$450K</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Progress</span>
                    <span className="stat-value">65%</span>
                  </div>
                </div>
                <div className="case-outcome">
                  <span className="outcome-label">Current Status:</span>
                  <p className="outcome-text">
                    Multiple fraudulent accounts identified, international subpoenas issued,
                    recovery operation in progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intelligence Reports Section */}
        <section id="intelligence" className="section intelligence-reports">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">INTELLIGENCE REPORTS</h2>
              <div className="title-line"></div>
            </div>

            <div className="reports-grid">
              <div className="report-card">
                <div className="report-header">
                  <span className="report-date">2024.03.15</span>
                  <span className="report-classification">CONFIDENTIAL</span>
                </div>
                <h3 className="report-title">Emerging Threats in DeFi Fraud</h3>
                <p className="report-excerpt">
                  Comprehensive analysis of new fraud patterns targeting decentralized finance
                  platforms, including flash loan attacks and oracle manipulation schemes.
                </p>
                <div className="report-highlights">
                  <h4>Key Findings:</h4>
                  <ul>
                    <li>300% increase in DeFi-related fraud incidents</li>
                    <li>New social engineering tactics targeting token holders</li>
                    <li>Cross-chain bridge vulnerabilities exploited</li>
                  </ul>
                </div>
                <div className="report-outcome">
                  <p>Published threat intelligence bulletin shared with 50+ financial institutions.</p>
                </div>
              </div>

              <div className="report-card">
                <div className="report-header">
                  <span className="report-date">2024.02.28</span>
                  <span className="report-classification">CLASSIFIED</span>
                </div>
                <h3 className="report-title">AI-Generated Fraud Detection Evasion</h3>
                <p className="report-excerpt">
                  Investigation into how fraudsters are using artificial intelligence to bypass
                  traditional detection systems and create more sophisticated social engineering attacks.
                </p>
                <div className="report-highlights">
                  <h4>Key Findings:</h4>
                  <ul>
                    <li>Deepfake voice synthesis in BEC attacks</li>
                    <li>AI-generated phishing content with 95% accuracy</li>
                    <li>Automated identity document forgery</li>
                  </ul>
                </div>
                <div className="report-outcome">
                  <p>Developed new detection protocols now implemented by major financial institutions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secure Communications Section */}
        <section id="comms" className="section secure-comms">
          <div className="container">
            <div className="comms-content">
              <div className="comms-intro">
                <h2 className="neon-glow">SECURE COMMUNICATIONS</h2>
                <p>For confidential consultations and urgent matters</p>
              </div>

              <form className="comms-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Agent Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    required
                    placeholder="Enter your identifier"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="organization">Organization</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className="form-input"
                    required
                    placeholder="Your organization or agency"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="priority">Priority Level</label>
                  <select id="priority" name="priority" className="form-select" required>
                    <option value="">Select priority level</option>
                    <option value="critical">CRITICAL - Immediate Response Required</option>
                    <option value="high">HIGH - Response within 4 hours</option>
                    <option value="medium">MEDIUM - Response within 24 hours</option>
                    <option value="consultation">CONSULTATION - General Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Secure Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    required
                    rows={6}
                    placeholder="Describe the situation, threat level, and required assistance..."
                  ></textarea>
                </div>

                <button type="submit" className="comms-submit">
                  <span>TRANSMIT SECURELY</span>
                  <span className="button-icon">→</span>
                </button>
              </form>

              <div className="comms-status">
                <div className="status-indicator"></div>
                <span className="status-text">All communications are encrypted and monitored 24/7</span>
              </div>
            </div>
          </div>
        </section>

        {/* System Status Section */}
        <section id="status" className="section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">SYSTEM STATUS</h2>
              <div className="title-line"></div>
            </div>

            <div className="status-monitor">
              <div className="status-header">
                <span className="status-title">COMMAND CENTER STATUS</span>
                <div className="status-indicator online"></div>
              </div>

              <div className="status-grid">
                <div className="status-item">
                  <span className="status-label">Network Security</span>
                  <span className="status-value">ACTIVE</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Threat Detection</span>
                  <span className="status-value">SCANNING</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Data Encryption</span>
                  <span className="status-value">ENABLED</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Backup Systems</span>
                  <span className="status-value">ONLINE</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Response Team</span>
                  <span className="status-value">READY</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Uptime</span>
                  <span className="status-value">99.97%</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>COMMAND CENTER</h3>
              <div className="system-status">
                <div className="status-item">
                  <div className="status-indicator online"></div>
                  <span>All Systems Operational</span>
                </div>
                <div className="status-item">
                  <div className="status-indicator scanning"></div>
                  <span>Threat Monitoring Active</span>
                </div>
                <div className="status-item">
                  <div className="status-indicator online"></div>
                  <span>Secure Communications</span>
                </div>
              </div>
            </div>

            <div className="footer-section">
              <h3>CAPABILITIES</h3>
              <p>Digital Forensics • Fraud Investigation • Cybersecurity • Asset Recovery • Expert Consultation</p>
            </div>

            <div className="footer-section">
              <h3>AVAILABILITY</h3>
              <p>24/7 Emergency Response<br/>
              Priority Cases: &lt;2 hour response<br/>
              Consultations: Within 24 hours</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Digital Fraud Detective | Command Center v2.0 | All Systems Secure</p>
          </div>
        </div>
      </footer>
    </div>
  );
}