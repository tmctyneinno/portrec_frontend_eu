<template>
  <!-- header -->
  <headerVue />
  <div class="space-from-header"></div>

  <div class="bg-gradient">
    <div class="container animate__animated animate__fadeIn ">

      <div class="section-panel min-vh-100 pt-5 pb-0  ">
        <div class="row g-3 justify-content-center align-items-center ">
          <div class="col-lg-6 order-2 order-md-1 ">
            <div class="section-title theme-color animate__animated animate__slideInLeft">ABOUT PORT<span
                class="theme-color2 fw-bold">REC</span></div>
            <p class="fw-bold">
              Portrec Resourcing is a global recruitment and HR solutions provider, dedicated to matching top talent
              with leading organizations across various sectors. We offer comprehensive services, including executive
              search, talent resourcing, payroll management, and umbrella company solutions.
            </p>
            <p>
              With offices in the UK and Lagos, Nigeria, and a network spanning Africa, the USA, Europe, and Asia, we
              deliver tailored solutions that meet the unique needs of both employers and job seekers. Known for our
              commitment to quality and speed, Portrec supports businesses of all sizes with flexible, efficient, and
              reliable HR and payroll services.
            </p>
          </div>
          <div class="col-lg-6 order-1 order-md-2">
            <img class=" animate__animated animate__pulse animate__infinite animate__slower "
              src="/images/about/frame.png" width="100%" alt="">
          </div>
        </div>

      </div>


      <div class="section-title fs-2 theme-color mb-4">Our Process</div>

      <div data-aos="fade-up" class="section-panel" v-for="(section, index) in sections" :key="index">
        <div class="row g-3 g-lg-5 justify-content-center align-items-center">
          <div class="col-md-6" v-if="section.imagePosition === 'left'">
            <img :src="section.image" width="100%" alt="" />
          </div>
          <div class="col-md-6">
            <h5 class="fw-bold">{{ section.title }}</h5>
            <p>{{ section.description }}</p>
            <div v-for="(point, idx) in section.points" :key="idx">
              <strong>{{ point.title }}</strong>: {{ point.content }}
            </div>
          </div>
          <div class="col-md-6" v-if="section.imagePosition === 'right'">
            <img :src="section.image" width="100%" alt="" />
          </div>
        </div>
        <hr class="faint my-4">
      </div>



      <div class="section-panel" data-aos="fade-up">
        <h5 class="fw-bold">{{ staffOutsourcing.title }}</h5>

        <!-- Background Checks -->
        <p>
          <strong>{{ staffOutsourcing.sections[0].heading }}</strong>:
          {{ staffOutsourcing.sections[0].description }}
        </p>

        <!-- Recruitment -->
        <p>
          <strong>{{ staffOutsourcing.sections[1].heading }}</strong>:
          {{ staffOutsourcing.sections[1].description }}
        </p>

        <!-- Staff Onboarding -->
        <div>
          <strong>{{ staffOutsourcing.sections[2].heading }}</strong>:
          {{ staffOutsourcing.sections[2].description }}
          <ul>
            <li v-for="(item, index) in staffOutsourcing.sections[2].items" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- Staff Training -->
        <div class="mt-3">
          <strong>{{ staffOutsourcing.sections[3].heading }}</strong>:
          {{ staffOutsourcing.sections[3].description }}
          <ul>
            <li v-for="(item, index) in staffOutsourcing.sections[3].items" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>

  <!-- footer -->
  <footerVue />
</template>

<script setup lang="ts">
import headerVue from '@/components/header.vue'
import footerVue from '@/components/footer.vue'
import { onMounted } from 'vue';
// @ts-ignore
import AOS from "aos";


onMounted(() => {
  AOS.init()
})


const sections = [
  {
    title: "Permanent Recruitment",
    description: `At Portrec, our permanent recruitment services connect businesses with top talent for long-term success. Our expert recruiters understand your company's unique needs and culture, ensuring a precise match between candidate and role. We handle:`,
    points: [
      {
        title: "Job Description Development",
        content: `We work with clients to create detailed job descriptions that accurately reflect the role's responsibilities, requirements, and company culture.`,
      },
      {
        title: "Candidate Sourcing and Screening",
        content: `Our recruiters utilize various channels to source top talent, including job boards, social media, and professional networks. We then screen candidates to ensure they meet the client's requirements.`,
      },
      {
        title: "Interviews and Assessments",
        content: `We coordinate interviews between clients and candidates, and can also provide assessment tools to help evaluate candidate skills and fit.`,
      },
      {
        title: "Reference Checks",
        content: `We conduct thorough reference checks to verify candidate credentials and work history.`,
      },
      {
        title: "Job Offer Management",
        content: `Once a candidate is selected, we assist with extending job offers, negotiating terms, and ensuring a smooth onboarding process.`,
      },
    ],
    image: "/images/about/process.jpg",
    imagePosition: "left",
  },
  {
    title: "Contract Recruitment",
    description: `Portrec's contract recruitment solutions provide flexible, skilled professionals for short-term or project-based needs. We offer:`,
    points: [
      {
        title: "Temporary, Contract, or Freelance Staffing",
        content: `We provide skilled professionals for short-term or project-based needs, offering flexibility and cost savings.`,
      },
      {
        title: "Quick Turnaround Times",
        content: `Our contract recruitment services ensure rapid deployment of talent to meet urgent business needs.`,
      },
      {
        title: "Access to Specialized Skills",
        content: `We offer access to specialized skills and expertise on a project basis.`,
      },
      {
        title: "Cost-Effective Solutions",
        content: `Our contract recruitment solutions reduce the costs associated with permanent recruitment and training.`,
      },
      {
        title: "Compliance Management",
        content: `We handle all compliance and regulatory requirements for contract staff.`,
      },
    ],
    image: "/images/about/executive.jpg",
    imagePosition: "right",
  },
  {
    title: "Consulting and Change Management",
    description: `Portrec's consulting and change management services support businesses through transformation and growth. Our experts provide:`,
    points: [

      {
        title: "Organizational Design",
        content: `We optimize organizational structures and processes for improved efficiency and performance.`,
      },
      {
        title: "Change Management Planning",
        content: `Our team develops and implements change management plans to minimize disruption and ensure smooth transitions.`,
      },
      {
        title: "Talent Development Programs",
        content: `We design and deliver training programs to enhance employee skills and performance.`,
      },
      {
        title: "Performance Improvement Initiatives",
        content: `Our experts identify areas for improvement and implement initiatives to boost productivity and efficiency.`,
      },
    ],
    image: "/images/about/payroll.jpg",
    imagePosition: "left",
  },
];


const staffOutsourcing = {
  title: "Staff Outsourcing",
  sections: [
    {
      heading: "Background Checks",
      description: `Our services range from previous employment checks, academic qualification checks, and other
      areas requiring the job seeker’s authentication, criminal record checks, reference check etc.`,
    },
    {
      heading: "Recruitment",
      description: `We connect businesses with top talent, handling, Job description development, Candidate sourcing and
      screening, Interviews and assessment, Job offer management`,
    },
    {
      heading: "Staff Onboarding",
      description: `We provide comprehensive onboarding programs to ensure new staff are integrated into the client's team, including:`,
      items: [
        "Paperwork and administrative tasks",
        "Benefits enrollment",
        "Company orientation",
        "Job-specific training",
      ],
    },
    {
      heading: "Staff Training",
      description: `Our training programs enhance staff skills and performance, covering:`,
      items: [
        "Industry-specific knowledge",
        "Soft skills development",
        "Technical skills training",
        "Leadership development",
      ],
    },
  ],
};


</script>

<style>
.bg-gradient {
  height: 100%;
  background: radial-gradient(circle at top left, #fcf5e1 0%, rgba(255, 255, 255, 0) 35%) !important;
  background-repeat: no-repeat;
  background-size: 100% 100%;

}

.animate__infinite {
  --animate-duration: 2s !important;
}
</style>