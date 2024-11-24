<template>
  <headerVue />
  <div class="space-from-header"></div>

  <div class="container animate__animated animate__fadeIn">

    <div class="section-panel min-vh-100 pt-3 pt-lg-0 pb-0">
      <div class="row g-3  justify-content-center align-items-center">
        <!-- <div class="col-md-4"></div> -->
        <div class="col-md-6 order-2 order-md-1">
          <div class=" fs-1 fw-bold" style="line-height: 1.3;">
            Hire Top professional Product Designers
          </div>
          <div class="">
            <p>
              Your vision deserves a great product designer to bring it to life. Finding the right fit alone is
              challenging alone, but Arc makes hiring the best freelance or full-time remote product designers easy.
              Save time by connecting directly with vetted product designers ready to interview.
            </p>
            <p>
              Find expert UI, UX, web, and product designers you need today.
            </p>


            <p>
              <button class="btn btn-primary rounded-">Hire a designer</button>
            <div class="text-muted">Risk free trial for any hire</div>
            </p>
          </div>
        </div>
        <div class="col-md-6 order-1 order-md-2">
          <img src="@/assets/images/recruitment.png" width="100%" alt="">

        </div>
      </div>
    </div>

    <div class="py-3">
      <companiesWeHaveHelped class="d-none d-md-block" />
    </div>

    <div class="section-panel">
      <div class="section-title fs-2 theme-color mb-4">Our Process</div>
      <div class="row g-3">
        <div class="col-md-6">
          <img src="@/assets/images/about/process.jpg" width="100%" alt="">
        </div>
        <div class="col-md-6">
          <h5 class="fw-bold">Talent Resourcing</h5>
          <div>
            The quality and qualification of job seekers are important criteria to determine the grade of the
            consultancy.
            Portrec proudly presents well-learned, harnessed individuals, prepared to face the industry leaders during
            the
            interviews. But hey! That’s not scary.And no need to worry if you are not up to the mark. There are many
            features that can help you upgrade yourself. Companies look for a potential talent pool from a trustworthy
            consultancy. We help them find the right candidate from our pool and redefine the customer-candidate
            experience. Candidates who have a strong desire to nurture themselves for better companies, get ample
            resources from the mentors of Portrec.With this prerogative, we were successful in establishing a
            long-lasting
            employer-employee relationship among thousands of quality talents dispersed across the world.
            Our resource and talent management experts are always on their toes looking for vacancies where a desirable
            candidate can fit in. Most of the candidates who register with us get placed in reputed organizations within
            a
            short span of time. But that’s not all. Our expert mentors advise each candidate to choose the right
            organization based on their skill set and career aspirations.
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="row g-3">
        <div class="col-md-6">
          <h5 class="fw-bold">Executive Search</h5>
          <div>
            Nobody likes poor leadership in an organization. It leads to mayhem in managing the resources, making
            achieving something to perfection difficult.Our executive team is aware, agile, and influencing. Each staff
            of
            our organization is devoted to the betterment of the aspirants and recruiters. They learn how to coordinate
            activities to ensure high-level success just by seeing people at work. All kinds of faults and blunders are
            avoided when the executive team meticulously scrutinizes the activities. Portrec earned its fame thanks to
            such leaders who have experience and skills is quite overwhelming. The executive search services offered by
            Portrec helps organizations to identify the best business leaders who become the role model of corporate
            strategy. Still Not Convinced?
            Why do you think so many stakeholders trust us? Because: We employ an executive search strategy, to project
            an
            overview of the current job market. Every interaction discloses the proficiencies and competencies of the
            candidate. We create our talent database with such information.
            We prove ourselves time and again for the impeccable services we offer and ensure that no contributor is
            disheartened.
          </div>
        </div>
        <div class="col-md-6">
          <img src="@/assets/images/about/executive.jpg" width="100%" alt="">
        </div>
      </div>
    </div>

    <div class="section-panel" style="padding-bottom: 200px;">
      <div class="row g-3">
        <div class="col-md-6">
          <img src="@/assets/images/about/payroll.jpg" width="100%" alt="">
        </div>
        <div class="col-md-6">
          <h5 class="fw-bold">Payroll Services</h5>
          <div>
            Portrec earned its position as the fastest growing and one of the most efficient payroll outsourcing
            companies
            in the UK. We are versatile and offer payroll services to a small start-up as well as a corporation. First,
            we
            understand how your organization works. Next, our finance and management experts provide you the best
            recommendation for a customized payroll service tailored for you. Here are some of the benefits you can get:
            Superfast and Hassle-Free process saving time and money Reliable and Accurate when it comes to expectations
            A secure and confidential solution.
            We provide payroll services and solutions across various sectors in different business units. You can find a
            brief explanation about each of those sectors:
            Accounting and Finance Risk Management Technology and Security Compliance and Financial Crime
            Business Change Transformation
          </div>
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

import companiesWeHaveHelped from './LandingPage/companies.vue';
</script>