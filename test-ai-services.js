// AI Services Test Script
// Run with: node test-ai-services.js (or convert to .ts and run with tsx)

const testCVText = `
John Smith
Software Engineer
Email: john.smith@email.com
Phone: (555) 123-4567
Location: San Francisco, CA

Professional Summary:
Experienced software engineer with 5+ years developing web applications. 
Skilled in JavaScript, React, Node.js, and cloud technologies.

Work Experience:
Senior Software Engineer at TechCorp (2022-Present)
- Led development of customer portal serving 10,000+ users
- Implemented microservices architecture reducing response time by 40%
- Mentored 3 junior developers and conducted code reviews

Software Engineer at StartupXYZ (2020-2022)  
- Built responsive web applications using React and TypeScript
- Developed REST APIs with Node.js and Express
- Collaborated with design team to implement user-friendly interfaces

Education:
Bachelor of Science in Computer Science
University of California, Berkeley (2016-2020)
GPA: 3.8/4.0

Skills:
- Programming: JavaScript, TypeScript, Python, Java
- Frontend: React, Vue.js, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Express, Django, Spring Boot
- Databases: PostgreSQL, MongoDB, Redis
- Cloud: AWS, Docker, Kubernetes

Projects:
E-commerce Platform (2023)
- Built full-stack e-commerce application with React and Node.js
- Integrated Stripe payment processing and inventory management
- Deployed on AWS with CI/CD pipeline
`;

const testRewriteText = "I worked on various projects and helped the team with different tasks.";

// Test CV Parsing
async function testCVParsing() {
  console.log('🧪 Testing CV Parsing...');
  
  try {
    const response = await fetch('http://localhost:3000/api/parse-cv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: testCVText })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    
    const result = await response.json();
    console.log('✅ CV Parsing successful!');
    console.log('📊 Parsed data summary:', {
      hasPersonalInfo: !!result.parsed?.personalInfo?.fullName,
      experienceCount: result.parsed?.experience?.length || 0,
      educationCount: result.parsed?.education?.length || 0,
      skillsCount: result.parsed?.skills?.length || 0
    });
    
    return result;
  } catch (error) {
    console.error('❌ CV Parsing failed:', error.message);
    return null;
  }
}

// Test Text Rewriting
async function testTextRewriting() {
  console.log('\\n🧪 Testing Text Rewriting...');
  
  try {
    const response = await fetch('http://localhost:3000/api/rewrite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        text: testRewriteText,
        context: 'experience'
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    
    const result = await response.json();
    console.log('✅ Text Rewriting successful!');
    console.log('📝 Original:', testRewriteText);
    console.log('✨ Rewritten:', result.rewritten);
    
    return result;
  } catch (error) {
    console.error('❌ Text Rewriting failed:', error.message);
    return null;
  }
}

// Test Contact Form
async function testContactForm() {
  console.log('\\n🧪 Testing Contact Form...');
  
  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'API Test',
        message: 'This is a test message from the AI services test script.',
        inquiryType: 'general',
        urgency: 'low'
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    
    const result = await response.json();
    console.log('✅ Contact Form successful!');
    console.log('📧 Ticket ID:', result.ticketId);
    
    return result;
  } catch (error) {
    console.error('❌ Contact Form failed:', error.message);
    return null;
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting AI Services Tests...\\n');
  
  const results = {
    parsing: await testCVParsing(),
    rewriting: await testTextRewriting(),
    contact: await testContactForm()
  };
  
  console.log('\\n📋 Test Summary:');
  console.log('- CV Parsing:', results.parsing ? '✅ PASS' : '❌ FAIL');
  console.log('- Text Rewriting:', results.rewriting ? '✅ PASS' : '❌ FAIL');
  console.log('- Contact Form:', results.contact ? '✅ PASS' : '❌ FAIL');
  
  const passCount = Object.values(results).filter(Boolean).length;
  console.log(`\\n🎯 Overall: ${passCount}/3 tests passed`);
  
  if (passCount === 3) {
    console.log('🎉 All AI services are working correctly!');
  } else {
    console.log('⚠️  Some services need attention. Check the logs above.');
  }
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  runAllTests().catch(console.error);
}

// Export for use in other files
export { testCVParsing, testTextRewriting, testContactForm, runAllTests };