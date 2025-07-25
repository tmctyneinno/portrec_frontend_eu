<template>
  <headerVue />
  <div class="space-from-header"></div>

  <div class="bg-gradient"> 
    <div class="container animate__animated animate__fadeIn">
      <!-- Hero Section -->
      <div class="section-panel min-vh-100 pt-5 pb-0">
        <div class="row g-3 justify-content-center align-items-center">
          <div class="col-lg-6 order-2 order-md-1">
            <div class="section-title theme-color animate__animated animate__slideInLeft">
              OUR<span class="theme-color2 fw-bold">SERVICES</span>
            </div>
            <p class="lead fw-bold">
              At PORTREC Resourcing UK, we deliver end-to-end talent, workforce, and HR solutions for organisations across the UK and internationally.
            </p>
            <p>
              From frontline recruitment to workforce outsourcing and strategic HR transformation, we help clients build skilled, agile, and future-ready teams.
            </p>
            <div class="d-flex flex-wrap gap-2 mt-4">
              <span class="badge bg-primary">Recruitment</span>
              <span class="badge bg-secondary">Talent Management</span>
              <span class="badge bg-success">Outsourcing</span>
              <span class="badge bg-danger">Training</span>
              <span class="badge bg-warning">HR Consultancy</span>
            </div>
          </div>
          <div class="col-lg-6 order-1 order-md-2">
            <img class="animate__animated animate__pulse animate__infinite animate__slower"
              src="/images/about/frame.png" width="100%" alt="HR Services Illustration">
          </div>
        </div>
      </div>

      <!-- Core Services Section -->
      <div class="section-title fs-2 theme-color mb-4 text-center">Our Comprehensive Solutions</div>
      
      <!-- Service Cards -->
      <div class="row g-4 mb-5">
        <div class="col-md-6 col-lg-4" v-for="(service, index) in serviceCards" :key="index" data-aos="fade-up">
          <div class="card h-100 service-card">
            <div class="card-body">
              <div class="service-icon mb-3">
                <i :class="service.icon"></i>
              </div>
              <h5 class="card-title fw-bold">{{ service.title }}</h5>
              <p class="card-text">{{ service.description }}</p>
              <ul class="service-features">
                <li v-for="(feature, i) in service.features" :key="i">{{ feature }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Service Sections -->
      <div class="detailed-services">
        <div class="service-section" v-for="(service, index) in detailedServices" :key="index" data-aos="fade-up">
          <div class="row g-4 align-items-center">
            <div class="col-md-5" :class="{ 'order-md-2': index % 2 === 0 }">
              <img :src="service.image" class="img-fluid rounded shadow" alt="">
            </div>
            <div class="col-md-7">
              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-description">{{ service.description }}</p>
              
              <div class="service-highlights">
                <div class="highlight-item" v-for="(highlight, hi) in service.highlights" :key="hi">
                  <h6 class="highlight-title">{{ highlight.title }}</h6>
                  <p class="highlight-content">{{ highlight.content }}</p>
                </div>
              </div>
            </div>
          </div>
          <hr class="my-5" v-if="index < detailedServices.length - 1">
        </div>
      </div>

      <!-- Industries Section -->
      <div class="industries-section mt-5" data-aos="fade-up">
        <h2 class="text-center mb-4">Industries We Support</h2>
        <div class="row g-3">
          <div class="col-6 col-md-4 col-lg-3" v-for="(industry, index) in industries" :key="index">
            <div class="industry-item p-3 text-center">
              <i :class="industry.icon" class="industry-icon"></i>
              <h6 class="mt-2">{{ industry.name }}</h6>
            </div>
          </div>
        </div>
      </div>

      <!-- Specialist Talent Section -->
      <div class="specialist-section py-5" data-aos="fade-up">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h2 class="text-center mb-5">Specialist Talent Areas</h2>
            <div class="row g-3">
              <div class="col-6 col-md-4 col-lg-3" v-for="(talent, index) in specialistTalent" :key="index">
                <div class="talent-card p-3 text-center h-100">
                  <i :class="talent.icon" class="talent-icon mb-2"></i>
                  <h6 class="fw-bold">{{ talent.area }}</h6>
                  <p class="small text-muted">{{ talent.examples }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- Why Choose Us Section -->
      <div class="why-choose-us bg-light py-5 mt-4" data-aos="fade-up">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="mb-4">Why Choose PORTREC?</h2>
            <div class="row g-4">
              <div class="col-md-6" v-for="(reason, index) in whyChooseUs" :key="index">
                <div class="reason-card p-4 h-100">
                  <i :class="reason.icon" class="reason-icon mb-3"></i>
                  <h5>{{ reason.title }}</h5>
                  <p class="mb-0">{{ reason.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <footerVue />
</template>

<script setup lang="ts">
import headerVue from '@/components/templates/header.vue'
import footerVue from '@/components/templates/footer.vue'
import { onMounted } from 'vue';
// @ts-ignore
import AOS from "aos";

onMounted(() => {
  AOS.init()
})

const serviceCards = [
  {
    title: "Recruitment & Staffing",
    icon: "fas fa-users",
    description: "Comprehensive staffing solutions across all job levels and sectors",
    features: [
      "Permanent & Temporary Recruitment",
      "Executive Search",
      "High-Volume Campaigns",
      "Emergency Cover"
    ]
  },
  {
    title: "Talent Management",
    icon: "fas fa-chart-line",
    description: "Strategic solutions to identify, develop and retain top talent",
    features: [
      "Workforce Planning",
      "Talent Assessment",
      "Diversity & Inclusion",
      "Engagement Strategies"
    ]
  },
  {
    title: "Outsourcing Solutions",
    icon: "fas fa-handshake",
    description: "End-to-end workforce outsourcing services",
    features: [
      "RPO (Recruitment Process Outsourcing)",
      "Managed Services (MSP)",
      "Payroll & Compliance",
      "Workforce Management"
    ]
  },
  {
    title: "Training & Development",
    icon: "fas fa-graduation-cap",
    description: "CPD-certified and bespoke training programmes",
    features: [
      "Leadership Development",
      "Digital Upskilling",
      "Compliance Training",
      "Soft Skills Coaching"
    ]
  },
  {
    title: "HR Consultancy",
    icon: "fas fa-briefcase",
    description: "Strategic HR transformation services",
    features: [
      "HR Audits & Policy Reviews",
      "Workforce Restructure",
      "Employee Relations",
      "EDI Consultancy"
    ]
  },
  {
    title: "Digital Solutions",
    icon: "fas fa-laptop-code",
    description: "Technology-driven workforce systems",
    features: [
      "HRMS Deployment",
      "Applicant Tracking",
      "Staff Portals",
      "Analytics Dashboards"
    ]
  }
]

const detailedServices = [
  {
    title: "Recruitment & Staffing Solutions",
    description: "We provide fast, flexible staffing solutions across all job levels, contract types, and industry sectors with our sector-specialist consultants and UK-wide recruitment capability.",
    image: "/images/about/process.jpg",
    highlights: [
      {
        title: "Comprehensive Placement Services",
        content: "From permanent placements to temp-to-perm solutions, we cover all employment types with rapid turnaround for urgent needs."
      },
      {
        title: "Specialist Recruitment",
        content: "Executive search for senior appointments and niche roles including Cybersecurity, Data Science, and specialized engineering positions."
      },
      {
        title: "High-Volume Campaigns",
        content: "Managed multi-site recruitment campaigns with diversity and inclusion focus for all organization sizes."
      }
    ]
  },
  {
    title: "Talent & Workforce Management",
    description: "Our strategic talent management services help organizations build future-ready teams through comprehensive development programs.",
    image: "/images/about/executive.jpg",
    highlights: [
      {
        title: "Succession Planning",
        content: "Workforce planning and succession mapping to ensure business continuity and growth."
      },
      {
        title: "Performance Frameworks",
        content: "Custom performance management systems aligned with your organizational goals."
      },
      {
        title: "Diversity & Inclusion",
        content: "EDI alignment services to build more inclusive workplaces."
      }
    ]
  },
  {
    title: "HR & Workforce Transformation",
    description: "We provide strategic HR consultancy and digital transformation services to modernize your workforce operations.",
    image: "/images/about/payroll.jpg",
    highlights: [
      {
        title: "HR Audits & Policy",
        content: "Comprehensive reviews of your HR practices with actionable improvement plans."
      },
      {
        title: "Digital Transformation",
        content: "HRMS/HRIS deployment and integration with existing systems."
      },
      {
        title: "Workforce Analytics",
        content: "Data-driven insights for better workforce decision making."
      }
    ]
  }
]

const industries = [
  { name: "Health & Social Care", icon: "fas fa-heartbeat" },
  { name: "IT & Digital", icon: "fas fa-laptop" },
  { name: "Construction & Engineering", icon: "fas fa-hard-hat" },
  { name: "Education & Early Years", icon: "fas fa-graduation-cap" },
  { name: "Logistics & Supply Chain", icon: "fas fa-truck" },
  { name: "Finance, Legal & Insurance", icon: "fas fa-chart-line" },
  { name: "Retail, Hospitality & Events", icon: "fas fa-shopping-bag" },
  { name: "Public Sector, Government & Local Authorities", icon: "fas fa-landmark" },
  { name: "Energy, Utilities & Infrastructure", icon: "fas fa-landmark" },
  { name: "Third Sector & Not-for-Profits", icon: "fas fa-landmark" },
]

const specialistTalent = [
  {
    area: "Technology",
    examples: "Cybersecurity, DevOps & Data Science",
    icon: "fas fa-shield-alt"
  },
  {
    area: "GRC",
    examples: "Governance, Risk & Compliance",
    icon: "fas fa-balance-scale"
  },
  {
    area: "Education",
    examples: "SEN & Behaviour Support",
    icon: "fas fa-chalkboard-teacher"
  },
  {
    area: "Engineering",
    examples: "Civil & Structural Engineering",
    icon: "fas fa-hard-hat"
  },
  {
    area: "Healthcare",
    examples: "Mental Health, Psychology & Social Work",
    icon: "fas fa-heartbeat"
  },
  {
    area: "Professional Services",
    examples: "Finance, Legal & Corporate Services",
    icon: "fas fa-briefcase"
  }
];


const whyChooseUs = [
  {
    title: "UK-wide & Global Reach",
    description: "Comprehensive recruitment capability across the UK and internationally",
    icon: "fas fa-globe-europe"
  },
  {
    title: "Sector Specialists",
    description: "Dedicated consultants with deep industry knowledge",
    icon: "fas fa-user-tie"
  },
  {
    title: "Compliance Focused",
    description: "Fully compliant and audit-ready processes",
    icon: "fas fa-clipboard-check"
  },
  {
    title: "Rapid Response",
    description: "Quick turnaround for urgent staffing needs",
    icon: "fas fa-bolt"
  },
  {
    title: "Diversity Commitment",
    description: "Inclusion-focused recruitment practices",
    icon: "fas fa-hands-helping"
  },
  {
    title: "Flexible Solutions",
    description: "Scalable, client-led delivery models",
    icon: "fas fa-cogs"
  }
];

</script>

<style>
.bg-gradient {
  background: radial-gradient(circle at top left, #fcf5e1 0%, rgba(255, 255, 255, 0) 35%) !important;
  background-repeat: no-repeat;
}

.service-card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
  height: 100%;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-icon {
  font-size: 2.5rem;
  color: var(--theme-color);
}

.service-features {
  list-style: none;
  padding-left: 0;
}

.service-features li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
}

.service-features li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--theme-color);
  font-weight: bold;
}

.service-title {
  color: var(--theme-color);
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.service-title:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--theme-color2);
}

.highlight-title {
  color: var(--theme-color2);
  font-weight: 600;
}

.industry-item {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.industry-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.industry-icon {
  font-size: 1.75rem;
  color: var(--theme-color);
}

@media (max-width: 768px) {
  .section-panel {
    padding-top: 2rem !important;
  }
}
</style>