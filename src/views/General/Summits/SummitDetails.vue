<template>
  <div class="pt-4 container animate__animated animate__fadeIn">
    <div class="row g-3">
      <div class="col-md-8">
        <!-- <div class="section-title fs-5 mb-2">
          Recent summits
        </div> -->
        <div class="card rounded-top-5 min-vh-100">
          <img class="card-img-top" src="/images/summitImage.png" alt="Title" />
          <div class="card-body">
            <h4 class="card-title fw-bold mt-3">{{ details.title }}</h4>
            <div class="card-text  mt-2">
              <div>Theme: {{ details.theme }}</div>
              <div>Date & Time: {{ details.dateTime.toUTCString() }}</div>
              <div>Location: {{ details.location }}</div>
              <div class="mt-2">
                Speakers:
                <ul>
                  <li v-for="({ name, title }, index) in details.speakers" :key="index">
                    {{ name }} <i class="bi bi-dash-lg"></i> {{ title }}
                  </li>
                </ul>
              </div>

              <section class="mt-5">
                <div class="fw-bold">
                  About the Summit
                </div>
                <div>Overview:</div>
                <div>The Portrec Global Innovation Summit 2024 is a high-impact gathering of industry leaders,
                  innovators, and professionals exploring the future of digital governance, AI, and cybersecurity. This
                  year’s edition will focus on emerging trends, ethical considerations, and real-world applications
                  shaping the future.</div>

                <div class="mt-3">Objectives:</div>
                <ul>
                  <li>Gain insights from industry experts on AI, cybersecurity, and digital governance.</li>
                  <li>Understand the impact of technology on modern governance.</li>
                  <li>Engage in interactive sessions and workshops led by professionals.</li>
                </ul>

              </section>

              <section class="mt-3">
                <div class="fw-bold">
                  Key Speakers
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item border-0">
                    <div class="fw-bolder">John Doe – CEO, TechCorp</div>
                    <div>Topic: “The Role of AI in Digital Governance"</div>
                  </li>

                  <li class="list-group-item border-0">
                    <div class="fw-bolder">Jane Smith – AI Expert, FutureTech</div>
                    <div>Topic: "AI and Cybersecurity: Future Challenges"</div>
                  </li>

                  <li class="list-group-item border-0">
                    <div class="fw-bolder">Dr. Michael Brown – Cybersecurity Analyst, CyberSafe Ltd</div>
                    <div>Topic: “Securing Digital Infrastructure in the AI Era”</div>
                  </li>

                  <li class="list-group-item border-0">
                    <div class="fw-bolder">Sophia Green – Data Privacy Consultant</div>
                    <div>Topic: “The Ethics of AI in Government Policies”</div>
                  </li>

                </ul>



              </section>

              <section class="mt-3">
                <div class="fw-bold">
                  Summit Agenda / Schedule
                </div>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Time </th>
                        <th>Session</th>
                        <th>Speaker</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(td, index) in schedulesTable" :key="index">
                        <td>{{ td.time }}</td>
                        <td>{{ td.session }}</td>
                        <td>{{ td.speaker }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>


              </section>


            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="section-title fs-5 mb-2">
          Recent summits
        </div>

        <div class="row g-3">
          <div class="col-12" v-for="(summit, index) in summitStore.recentSummits" :key="index">
            <SummitsCardComponent :obj="summit" />
          </div>

          <div class="col-12">
            <a class="float-end small theme-color text-decoration-none" href="#">Show more...</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { SummitInterface } from '@/stores/interfaces';
import SummitsCardComponent from './SummitsCardComponent.vue';
import { useSummitStore } from './summitStore';
import { ref } from 'vue';

const summitStore = useSummitStore()


const details = ref<SummitInterface>({
  id: '1',
  title: 'Portrec Global Innovation Summit 2024',
  theme: 'The Future of Digital Governance',
  dateTime: new Date(),
  location: 'Virtual (YouTube Live)',
  speakers: [
    { name: 'John Doe', title: 'CEO, TechCorp' },
    { name: 'Jane Smith', title: 'AI Expert, FutureTech' },
  ],
  otherDetails: {

  }

})

const schedulesTable = ref<{ time: string, session: string, speaker: string }[]>([
  { time: '10:00 AM', session: 'Welcome & Opening Remarks', speaker: 'Host Name' },
  { time: '10:30 AM', session: 'Keynote: The Future of AI', speaker: 'John Doe' },
  { time: '11:30 AM', session: 'Panel Discussion: Cybersecurity', speaker: 'Jane Smith' },
  { time: '12:30 PM', session: 'Break', speaker: '-' },
  { time: '1:00 PM', session: 'Workshop: AI Ethics & Regulations', speaker: 'Dr. Michael' },
  { time: '2:30 PM', session: 'Closing Remarks', speaker: 'Dr. Brown' },
])


</script>