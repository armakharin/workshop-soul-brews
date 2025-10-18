// Mockup project and blog content for Digital Fraud Detective Portfolio

// Case Files Data
const caseFiles = [
    {
        id: 1,
        title: "Phishing Ring Investigation",
        status: "active",
        description: "Advanced email analysis platform for detecting coordinated phishing attacks across multiple domains.",
        technologies: ["Python", "Email Headers", "Pattern Recognition"],
        metrics: {
            emailsAnalyzed: 2847,
            detectionRate: 94,
            threatsIdentified: 127,
            responseTime: "2.3s"
        },
        timeline: "2024-01 - Present",
        impact: "Prevented $2.3M in potential losses",
        details: {
            challenge: "Sophisticated phishing campaign using multiple domains and social engineering tactics",
            solution: "Developed automated email analysis system with header analysis and pattern matching",
            technologies: ["Python 3.9", "Regular Expressions", "Network Analysis", "Machine Learning"],
            outcome: "94% detection rate with 2.3s average response time"
        }
    },
    {
        id: 2,
        title: "Payment Fraud Pattern Analysis",
        status: "closed",
        description: "SQL-based analytics system identifying suspicious payment patterns and transaction anomalies in real-time.",
        technologies: ["SQL", "Analytics", "Real-time"],
        metrics: {
            lossPrevented: "$1.2M",
            alertTime: "0.8s",
            falsePositives: 12,
            accuracy: 96
        },
        timeline: "2023-08 - 2024-02",
        impact: "Reduced fraudulent transactions by 73%",
        details: {
            challenge: "High volume of payment transactions requiring real-time fraud detection",
            solution: "Created SQL-based analytics platform with real-time monitoring and alerting",
            technologies: ["PostgreSQL", "Advanced SQL", "Window Functions", "Stored Procedures"],
            outcome: "96% accuracy with minimal false positives"
        }
    },
    {
        id: 3,
        title: "Automated Suspicious Activity Detection",
        status: "active",
        description: "Machine learning pipeline for automatically flagging and escalating suspicious financial activities.",
        technologies: ["Python", "ML", "Automation"],
        metrics: {
            monitoring: "24/7",
            falsePositiveReduction: 87,
            escalationRate: 95,
            processingTime: "0.3s"
        },
        timeline: "2024-03 - Present",
        impact: "87% reduction in false positive alerts",
        details: {
            challenge: "Manual review process was overwhelmed with false positive alerts",
            solution: "Implemented ML pipeline with automated triage and escalation",
            technologies: ["Python", "Scikit-learn", "Pandas", "Automation Scripts"],
            outcome: "Intelligent alerting with 87% fewer false positives"
        }
    },
    {
        id: 4,
        title: "Transaction Network Analysis",
        status: "closed",
        description: "Interactive visualization platform mapping complex transaction networks and identifying fraud rings.",
        technologies: ["D3.js", "Network Analysis", "Visualization"],
        metrics: {
            nodesMapped: 15000,
            networksIdentified: 42,
            investigationTime: "60%",
            connectionsFound: 2847
        },
        timeline: "2023-11 - 2024-01",
        impact: "Reduced investigation time by 60%",
        details: {
            challenge: "Complex fraud rings were difficult to identify through traditional analysis",
            solution: "Built interactive network visualization platform with graph analysis",
            technologies: ["D3.js", "NetworkX", "Graph Theory", "Data Visualization"],
            outcome: "Identified 42 fraud networks with 15K connected nodes"
        }
    }
];

// Intelligence Reports Data
const intelligenceReports = [
    {
        id: 1,
        title: "SQL Techniques for Financial Crime Detection",
        date: "2024-03-15",
        category: "Technical Analysis",
        readTime: "8 min",
        summary: "Advanced SQL queries and window functions for identifying sophisticated fraud patterns in large financial datasets.",
        content: {
            introduction: "Financial crime detection requires sophisticated SQL techniques to analyze millions of transactions efficiently. This article explores advanced SQL methods for fraud detection.",
            techniques: [
                {
                    name: "Window Functions for Pattern Analysis",
                    description: "Using LAG() and LEAD() functions to compare transactions with historical data",
                    code: `SELECT transaction_id, amount, user_id,
LAG(amount) OVER (PARTITION BY user_id ORDER BY timestamp) as prev_amount,
amount / LAG(amount) OVER (PARTITION BY user_id ORDER BY timestamp) as ratio
FROM transactions
WHERE amount > LAG(amount) OVER (PARTITION BY user_id ORDER BY timestamp) * 10;`
                },
                {
                    name: "Common Table Expressions for Complex Analysis",
                    description: "Breaking down complex fraud detection logic into readable, maintainable queries",
                    code: `WITH user_patterns AS (
    SELECT user_id,
           AVG(amount) as avg_amount,
           STDDEV(amount) as std_amount,
           COUNT(*) as transaction_count
    FROM transactions
    WHERE timestamp >= NOW() - INTERVAL '30 days'
    GROUP BY user_id
)
SELECT t.*, up.avg_amount, up.std_amount
FROM transactions t
JOIN user_patterns up ON t.user_id = up.user_id
WHERE t.amount > up.avg_amount + (3 * up.std_amount);`
                }
            ],
            conclusion: "These SQL techniques provide powerful tools for identifying financial crime patterns while maintaining performance on large datasets."
        },
        tags: ["SQL", "Window Functions", "Financial Analysis", "Data Analysis"]
    },
    {
        id: 2,
        title: "Building Python Automation Tools for Fraud Analysts",
        date: "2024-03-01",
        category: "Automation",
        readTime: "12 min",
        summary: "Developing automated investigation workflows using Python to reduce manual analysis time and improve detection accuracy.",
        content: {
            introduction: "Manual fraud analysis is time-consuming and prone to human error. Python automation can dramatically improve efficiency and accuracy.",
            techniques: [
                {
                    name: "Statistical Anomaly Detection",
                    description: "Using statistical methods to identify outliers in transaction data",
                    code: `import numpy as np
from scipy import stats

def detect_anomalies(transactions, threshold=3):
    \"\"\"Detect statistical anomalies in transaction amounts\"\"\"
    z_scores = np.abs(stats.zscore(transactions))
    return transactions[z_scores > threshold]

# Example usage
amounts = [100, 150, 200, 5000, 180, 220]  # Note the outlier 5000
anomalies = detect_anomalies(amounts)
print(f\"Anomalous transactions: {anomalies}\")`
                },
                {
                    name: "Email Header Analysis",
                    description: "Automated analysis of email headers for phishing detection",
                    code: `import re
from email import policy
from email.parser import BytesParser

def analyze_email_headers(raw_email):
    \"\"\"Extract and analyze email headers for fraud indicators\"\"\"
    msg = BytesParser(policy=policy.default).parsebytes(raw_email)

    indicators = {
        'suspicious_sender': False,
        'missing_spf': False,
        'suspicious_links': 0,
        'urgency_language': False
    }

    # Check sender domain
    sender = msg['From']
    if sender and not is_trusted_domain(sender):
        indicators['suspicious_sender'] = True

    # Check for urgency language
    subject = msg['Subject']
    if subject and re.search(r'urgent|immediate|action required', subject, re.I):
        indicators['urgency_language'] = True

    return indicators`
                }
            ],
            conclusion: "Python automation tools can reduce investigation time by up to 80% while improving detection accuracy through consistent application of fraud detection rules."
        },
        tags: ["Python", "Automation", "Statistics", "Email Analysis"]
    },
    {
        id: 3,
        title: "Machine Learning Patterns in Suspicious Activity Monitoring",
        date: "2024-02-18",
        category: "Machine Learning",
        readTime: "15 min",
        summary: "Implementing ML algorithms for real-time suspicious activity detection and reducing false positive rates.",
        content: {
            introduction: "Machine learning offers powerful capabilities for fraud detection, but requires careful implementation to avoid bias and maintain accuracy.",
            techniques: [
                {
                    name: "Isolation Forest for Anomaly Detection",
                    description: "Unsupervised learning for identifying unusual patterns in transaction data",
                    code: `from sklearn.ensemble import IsolationForest
import pandas as pd

def train_anomaly_detector(transaction_data):
    \"\"\"Train isolation forest model for fraud detection\"\"\"
    # Prepare features
    features = ['amount', 'hour_of_day', 'day_of_week',
                'user_transaction_count', 'merchant_risk_score']

    X = transaction_data[features]

    # Train model
    model = IsolationForest(
        contamination=0.1,  # Expected fraud rate
        random_state=42,
        n_estimators=100
    )

    model.fit(X)
    return model

# Predict anomalies
model = train_anomaly_detector(df)
predictions = model.predict(X)
anomaly_scores = model.decision_function(X)`
                },
                {
                    name: "Real-time Feature Engineering",
                    description: "Creating features for streaming transaction data",
                    code: `def extract_real_time_features(transaction, user_history):
    \"\"\"Extract features for real-time fraud detection\"\"\"
    features = {
        'amount': transaction['amount'],
        'hour_of_day': transaction['timestamp'].hour,
        'day_of_week': transaction['timestamp'].weekday(),
        'amount_vs_avg': transaction['amount'] / user_history['avg_amount'],
        'frequency_score': calculate_frequency_score(transaction, user_history),
        'location_risk': get_location_risk_score(transaction['location']),
        'device_risk': get_device_risk_score(transaction['device_id'])
    }

    return list(features.values())`
                }
            ],
            conclusion: "ML-based fraud detection can achieve 95%+ accuracy when properly trained with quality data and regularly validated against emerging fraud patterns."
        },
        tags: ["Machine Learning", "Anomaly Detection", "Real-time", "Feature Engineering"]
    }
];

// Agent Profile Data
const agentProfile = {
    name: "Digital Fraud Detective",
    title: "Senior Digital Fraud Analyst",
    background: {
        summary: "Experienced financial crime investigator transitioning to development engineering. Specialized in pattern recognition, data analysis, and automated detection systems.",
        experience: [
            {
                period: "2021 - Present",
                role: "Senior Digital Fraud Analyst",
                company: "Financial Services Firm",
                achievements: [
                    "Reduced fraud losses by $4.2M through advanced detection algorithms",
                    "Implemented automated investigation workflow reducing case resolution time by 65%",
                    "Led cross-functional team in developing real-time fraud detection platform"
                ]
            },
            {
                period: "2018 - 2021",
                role: "Fraud Investigator",
                company: "E-commerce Platform",
                achievements: [
                    "Investigated 2,000+ fraud cases with 94% conviction rate",
                    "Developed SQL-based fraud detection queries still in production",
                    "Trained 15+ junior investigators on fraud detection techniques"
                ]
            }
        ],
        education: [
            {
                degree: "Bachelor of Science",
                field: "Information Systems",
                school: "State University",
                year: "2018"
            }
        ],
        certifications: [
            "Certified Fraud Examiner (CFE)",
            "SQL for Data Analysis",
            "Python for Data Science"
        ]
    },
    skills: {
        technical: [
            { name: "SQL Analysis", level: 95 },
            { name: "Python Automation", level: 85 },
            { name: "Data Visualization", level: 80 },
            { name: "Web Development", level: 75 },
            { name: "Machine Learning", level: 70 },
            { name: "Statistical Analysis", level: 88 }
        ],
        investigation: [
            { name: "Pattern Recognition", level: 92 },
            { name: "Network Analysis", level: 85 },
            { name: "Digital Forensics", level: 78 },
            { name: "Risk Assessment", level: 90 }
        ]
    }
};

// Contact Form Configuration
const contactConfig = {
    recipient: "agent@digitalfrauddetective.com",
    subjectPrefix: "[PORTFOLIO CONTACT]",
    autoReply: {
        enabled: true,
        message: "Thank you for your message. I'll respond within 24 hours."
    },
    validation: {
        required: ["name", "email", "subject", "message"],
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address"
        },
        message: {
            minLength: 10,
            maxLength: 1000,
            message: "Message must be between 10 and 1000 characters"
        }
    }
};

// Mission Types (for contact form)
const missionTypes = [
    { value: "collaboration", label: "Collaboration Opportunity" },
    { value: "consulting", label: "Fraud Analysis Consulting" },
    { value: "development", label: "Development Project" },
    { value: "speaking", label: "Speaking Engagement" },
    { value: "mentoring", label: "Mentorship Opportunity" },
    { value: "other", label: "Other Mission" }
];

// System Status (for command center display)
const systemStatus = {
    database: { status: "online", uptime: "99.8%", responseTime: "45ms" },
    api: { status: "operational", requests: "1.2M/day", errorRate: "0.02%" },
    monitoring: { status: "active", alerts: "3", resolution: "15min avg" },
    security: { status: "secured", firewall: "active", ssl: "valid" }
};

// Export all data
window.ContentData = {
    caseFiles,
    intelligenceReports,
    agentProfile,
    contactConfig,
    missionTypes,
    systemStatus
};

// Helper functions
window.ContentHelpers = {
    getCaseById: (id) => caseFiles.find(c => c.id === id),
    getReportById: (id) => intelligenceReports.find(r => r.id === id),
    getActiveCases: () => caseFiles.filter(c => c.status === 'active'),
    formatMetric: (value, suffix = '') => {
        if (typeof value === 'number') {
            return value.toLocaleString() + suffix;
        }
        return value + suffix;
    },
    calculateReadTime: (content) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(' ').length;
        return Math.ceil(wordCount / wordsPerMinute);
    }
};