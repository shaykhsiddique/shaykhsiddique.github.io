function loadData(file) {
  return fetch(file).then(r => r.json()).catch(() => []);
}

// Helper: Animate numbers
function animateValue(el, start, end, duration) {
  let range = end - start, minTimer = 50, stepTime = Math.max(Math.floor(duration / range), minTimer);
  let startTime = new Date().getTime(), endTime = startTime + duration;
  function run() {
    let now = new Date().getTime(), remaining = Math.max((endTime - now) / duration, 0);
    let value = Math.round(end - (remaining * range));
    el.textContent = value;
    if (value < end) setTimeout(run, stepTime);
  }
  run();
}

// Vue components
const Home = {
  data() {
    return {
      news: [],
      typingText: "",
      lines: [
        "Security and Privacy In Emerging Computing and Networking System (SPIES) Lab",
        "Research   |   Innovation   |   Execution",
        "Clean and Resilient Energy Systems (CARES) lab"
      ],
      lineIndex: 0, charIndex: 0, typing: true
    }
  },
  template: `
    <div class="row align-items-top flex-column flex-lg-row">
      <div class="col-lg-8 col-12 pt-2">
        <div style="position:relative;min-height:320px" data-aos="fade-up">
          <video autoplay muted loop playsinline
                style="width:100%;max-height:320px;object-fit:cover;border-radius:16px;">
            <source src="myvideo.mp4" type="video/mp4"/>
          </video>
          <center><div class="typewriterClass"
            style="position:absolute;top:28px;left:28px;z-index:2;background:rgba(0,25,55,0.49);padding:16px 22px;border-radius:12px;box-shadow:0 0 12px #151e2c;">
            <h3>{{ typingText }}</h3>
          </div></center>
        </div>
        <div class="mt-3 mb-3" data-aos="fade-right">
          <h3 class="appFontcolor" style="font-family:'Roboto Mono'"><i class="fa fa-cogs neonText"></i> Welcome!</h3>
          <p class="text-justify">
        Hi! I'm <span class="appFontcolor" style="font-family:'Roboto Mono';font-weight:600">Shaykh Siddique</span>, a PhD student in the Department of Computer Science at Texas A&M University. I'm advised by Dr. Nitesh Saxena and co-advised by Dr. Irfan Khan in the
        <a href="https://spies.engr.tamu.edu" target="_blank" style="color:#43e0b5;">Security and Privacy In Emerging Computing and Networking Systems (SPIES)</a> research lab,
        and the <a href="https://www.tamug.edu/cares/index.html" target="_blank" style="color:#43e0b5;">Clean And Resilient Energy Systems (CARES)</a> lab. My research interests lie in building privacy engineering tools using machine learning and artificial intelligence.
      </p>
      <p class="text-justify">
        My passion for applying Deep Learning and Artificial Intelligence to real-world challenges has grown stronger as I've developed my skills over the years. The deeper I delve into this field, the more I admire its potential to elegantly address complex issues in areas like cybersecurity, air/marine defense systems, and computer vision for medical imaging.
      </p>
      <p class="text-justify">
        I completed my MS in Computer Science from Prairie View A&M University, Texas, USA. My master’s thesis focused on applying machine learning to sports, where I developed predictive models for player performance and game outcomes. This work involved leveraging statistical and computational techniques to optimize teaming strategies in sports management.
      </p>
      <p class="text-justify">
        Beyond my research pursuits, I have a deep passion for traveling and immersing myself in nature. I find great joy in exploring new places and experiencing different cultures. Additionally, I enjoy swimming, playing badminton, and engaging in chess.
      </p>
          <div>
            <a href="https://github.com/shaykhsiddique" class="circle-icon" target="_blank"><i class="fa fa-github"></i></a>
            <a href="https://www.linkedin.com/in/shaykhsiddique" class="circle-icon" target="_blank"><i class="fa fa-linkedin"></i></a>
            <a href="https://scholar.google.com/citations?user=Hf71CFwAAAAJ" class="circle-icon" target="_blank"><i class="fa fa-graduation-cap"></i></a>
            <a href="mailto:shaykhsiddiqee@gmail.com" class="circle-icon" target="_blank"><i class="fa fa-envelope"></i></a>
          </div>
        </div>
        <div class="row mt-3" data-aos="fade-up">
          <!-- Dynamic counters example -->
          <div class="col-6 col-md-3 text-center mb-2">
            <div style="font-size:2.1rem;font-family:'Roboto Mono';color:#7fffd4" id="pubCount"></div>
            <div style="color:#999;font-size:.98rem;">Publications</div>
          </div>
          <div class="col-6 col-md-3 text-center mb-2">
            <div style="font-size:2.1rem;font-family:'Roboto Mono';color:#7fffd4" id="expCount"></div>
            <div style="color:#999;font-size:.98rem;">Roles</div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-12 mt-3 mt-lg-0" data-aos="fade-left">
        <div class="card">
          <div class="card-header text-center">
            <b><i class="fa fa-newspaper-o"></i> Recent News</b>
          </div>
          <div class="card-body" style="overflow-y:auto;">
            <ul class="list-group-flush" v-if="news.length">
              <li v-for="n in news.slice(0,5)" class="mb-3 pb-1" style="border-bottom:1px dashed #23273c;">
                <b class="appFontcolor">{{ n.title }}</b><br>
                <small style="color:#888;">{{ n.date }}</small>
                <div>{{ n.content }}</div>
                <!-- UPDATED LINK: This now links to the article detail page -->
                <div>
                  <router-link :to="{ name: 'news-article', params: { id: n.id } }" style="color:#43e0b5;">
                    Read more
                  </router-link>
                </div>
              </li>
            </ul>
            <div v-else class="text-muted">No news yet.</div>
          </div>
        </div>
      </div>
    </div>
  `,
  created() {
    loadData('data/news.json').then(d => this.news = d);
    loadData('data/publications.json').then(d => setTimeout(() => animateValue(document.getElementById('pubCount'), 0, d.length, 900), 250));
    loadData('data/experience.json').then(d => setTimeout(() => animateValue(document.getElementById('expCount'), 0, d.length, 850), 250));
    this.typeLoop();
  },
  mounted() { AOS.init({ duration: 800 }); },
  methods: {
    typeLoop() {
      if (this.typing) {
        if (this.charIndex < this.lines[this.lineIndex].length) {
          this.typingText += this.lines[this.lineIndex][this.charIndex];
          this.charIndex++; setTimeout(this.typeLoop, 56);
        } else { this.typing = false; setTimeout(this.clearLoop, 1000); }
      }
    },
    clearLoop() {
      if (this.charIndex > 0) {
        this.typingText = this.lines[this.lineIndex].substring(0, this.charIndex - 1);
        this.charIndex--; setTimeout(this.clearLoop, 32);
      } else {
        this.lineIndex = (this.lineIndex + 1) % this.lines.length;
        this.typing = true; setTimeout(this.typeLoop, 390);
      }
    }
  }
};
const Research = {
  template: `
    <div data-aos="fade-in">
      <h2>My Research</h2>
      <div class="row">
        <div class="col-md-2 mb-3" data-aos="fade-right">
          <img src="MyDp.jpeg" class="img-thumbnail shadDown">
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-9" data-aos="fade-up">
          <div class="card">
            <div class="card-body">
            <p>My research is dedicated to securing AI-enabled maritime systems against emerging cyber threats. As the industry increasingly relies on artificial intelligence for navigation, port logistics, and autonomous operations, the objective is to ensure these critical systems remain reliable, resilient, and trustworthy.</p>
            <p>Building on this vision, the research centers on the intersection of maritime cybersecurity, trustworthy AI, and adversarial machine learning. It investigates how adversaries can manipulate sensor and data pipelines—from AIS and GNSS to radar—to deceive AI models and compromise vessel operations. The approach involves designing robust defenses, hardening sensor fusion pipelines, and using VR-based simulations to model and test vessel behaviors in contested cyber environments. Ultimately, the goal is to develop practical, evidence-based security frameworks that maritime operators can trust to safeguard autonomous and AI-driven systems at sea.</p>
            <h6>Selected Previous Research:</h6>
            <p>The focus on maritime security emerges from a robust background in applied AI and cybersecurity, with earlier projects evolving from foundational machine learning to tackling real-world security challenges in high-stakes environments.</p>
            <ul>
              <li><strong>AI for Cybersecurity:</strong> Development of deep learning models for automated software vulnerability detection in source code and analysis of the reliability and user acceptance of biometric security systems for access control.</li>
              <li><strong>Advanced Deep Learning Applications:</strong> Application of convolutional neural networks for medical image analysis in detecting neurological disorders and the use of recurrent neural networks for complex natural language processing tasks, including machine translation.</li>
              <li><strong>Software Engineering & Data Analysis:</strong> Foundational research into code review processes to ensure software quality and data-driven optimization through statistical analysis to identify optimal team compositions.</li>
            </ul>
            <p>This interdisciplinary foundation in AI, cybersecurity, and robust software engineering underpins ongoing work in maritime security.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  mounted() { AOS.init({ duration: 800 }); }
};
const Education = {
  data() { return { items: [] }; },
  template: `
    <div>
      <hr>
      <h2 data-aos="fade-left">Education</h2>
      <div class="row">
        <div class="col-md-8 col-12">
          <div class="timeline">
            <div class="timeline-item" v-for="e in items" data-aos="fade-right">
              <h3>{{e.degree}}</h3>
              <time>{{e.period}}</time>
              <div class="location">{{e.institution}}</div>
            </div>
          </div>
        </div>
        <div class="col-md-4 text-center col-12">
          <img src="my_rep.jpeg" class="img-rounded mt-3" height="170" data-aos="zoom-in">
        </div>
      </div>
    </div>
  `,
  created() { loadData('data/education.json').then(d => this.items = d); },
  mounted() { AOS.init({ duration: 800 }); }
};

const Research = {
  template: `
    <div data-aos="fade-in">
      <h2>My Research</h2>
      <div class="row">
        <div class="col-md-2 mb-3" data-aos="fade-right">
          <img src="mynewpicMaritime.jpg" class="img-thumbnail shadDown">
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-9" data-aos="fade-up">
          <div class="card">
            <div class="card-body">
            <p>My research is dedicated to securing AI-enabled maritime systems against emerging cyber threats. As the industry increasingly relies on artificial intelligence for navigation, port logistics, and autonomous operations, the objective is to ensure these critical systems remain reliable, resilient, and trustworthy.</p>
            <p>Building on this vision, the research centers on the intersection of maritime cybersecurity, trustworthy AI, and adversarial machine learning. It investigates how adversaries can manipulate sensor and data pipelines—from AIS and GNSS to radar—to deceive AI models and compromise vessel operations. The approach involves designing robust defenses, hardening sensor fusion pipelines, and using VR-based simulations to model and test vessel behaviors in contested cyber environments. Ultimately, the goal is to develop practical, evidence-based security frameworks that maritime operators can trust to safeguard autonomous and AI-driven systems at sea.</p>
            <h6>Selected Previous Research:</h6>
            <p>The focus on maritime security emerges from a robust background in applied AI and cybersecurity, with earlier projects evolving from foundational machine learning to tackling real-world security challenges in high-stakes environments.</p>
            <ul>
              <li><strong>AI for Cybersecurity:</strong> Development of deep learning models for automated software vulnerability detection in source code and analysis of the reliability and user acceptance of biometric security systems for access control.</li>
              <li><strong>Advanced Deep Learning Applications:</strong> Application of convolutional neural networks for medical image analysis in detecting neurological disorders and the use of recurrent neural networks for complex natural language processing tasks, including machine translation.</li>
              <li><strong>Software Engineering & Data Analysis:</strong> Foundational research into code review processes to ensure software quality and data-driven optimization through statistical analysis to identify optimal team compositions.</li>
            </ul>
            <p>This interdisciplinary foundation in AI, cybersecurity, and robust software engineering underpins ongoing work in maritime security.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  mounted() { AOS.init({ duration: 800 }); }
};

const Education = {
  data() { return { items: [] }; },
  template: `
    <div>
      <hr>
      <h2 data-aos="fade-left">Education</h2>
      <div class="row">
        <div class="col-md-8 col-12">
          <div class="timeline">
            <div class="timeline-item" v-for="e in items" data-aos="fade-right">
              <h3>{{e.degree}}</h3>
              <time>{{e.period}}</time>
              <div class="location">{{e.institution}}</div>
            </div>
          </div>
        </div>
        <div class="col-md-4 text-center col-12">
          <img src="my_rep.jpeg" class="img-rounded mt-3" height="170" data-aos="zoom-in">
        </div>
      </div>
    </div>
  `,
  created() { loadData('data/education.json').then(d => this.items = d); },
  mounted() { AOS.init({ duration: 800 }); }
};

const Publications = {
  data() { return { pubs: [] }; },
  template: `
    <div>
      <hr>
      <h2 data-aos="fade-left">Publications</h2>
      <div class="timeline">
        <div v-for="p in pubs" class="timeline-item" data-aos="fade-in">
          <h5>{{p.title}}</h5>
          <time>{{p.date}}</time>
          <div class="location" v-html="p.authors"></div>
          <div class="doi" v-if="p.doi">Doi: <a :href="p.doi_link" target="_blank">{{p.doi}}</a></div>
        </div>
      </div>
    </div>
  `,
  created() {
    loadData('data/publications.json').then(d => {
      d.forEach(pub => pub.doi_link = pub.doi.startsWith('http') ? pub.doi : ('https://doi.org/' + pub.doi));
      this.pubs = d;
    });
  },
  mounted() { AOS.init({ duration: 800 }); }
};

const Experience = {
  data() { return { items: [] }; },
  template: `
    <div>
      <hr>
      <h2 data-aos="fade-left">Professional Experience</h2>
      <div class="timeline">
        <div v-for="e in items" class="timeline-item" data-aos="fade-right">
          <h3>{{e.role}}</h3>
          <time>{{e.period}}</time>
          <div class="location">{{e.place}}</div>
        </div>
      </div>
    </div>
  `,
  created() { loadData('data/experience.json').then(d => this.items = d); },
  mounted() { AOS.init({ duration: 800 }); }
};


const Awards = {
  data() { return { awards: [] }; },
  template: `
    <div>
      <hr>
      <h2 data-aos="fade-left">Leadership & Awards</h2>
      <div class="timeline">
        <div v-for="award in awards" class="timeline-item" data-aos="fade-right">
          <h3>{{ award.title }} <span style="color: #87ffce; font-size:1rem;">({{ award.year }})</span></h3>
          <div class="location" style="color: #43e0b5;">{{ award.organization }}</div>
          <div style="color: #ccc; font-size:1rem;">{{ award.description }}</div>
        </div>
      </div>
    </div>
  `,
  created() { loadData('data/award.json').then(d => this.awards = d); },
  mounted() { AOS.init({ duration: 800 }); }
};

const Contact = {
  template: `
    <div data-aos="fade-in">
      <hr>
      <h2>Contact</h2>
      <div class="row mt-3">
        <div class="col-md-4">
          <img src="MyDp.jpeg" class="img-thumbnail" data-aos="zoom-in">
        </div>
        <div class="col-md-8 mb-3" data-aos="fade-up">
          <p><i class="fa fa-envelope"></i> Email: <a href="mailto:shaykhsiddiqee@gmail.com" style="color:#43e0b5;">shaykhsiddiqee@gmail.com</a></p>
          <p><i class="fa fa-phone"></i> Phone: <a href="tel:+19796450271" style="color:#43e0b5;">+1 (979) 645-0271</a></p>
          <p><i class="fa fa-linkedin"></i> LinkedIn: <a href="https://www.linkedin.com/in/shaykhsiddique" target="_blank" style="color:#43e0b5;">shaykhsiddique</a></p>
        </div>
      </div>
    </div>
  `,
  mounted() { AOS.init({ duration: 800 }); }
};


const NewsArticle = {
  data() {
    return {
      article: null, // This will hold the specific article object
      loading: true  // A flag to show a loading message
    };
  },
  template: `
    <div data-aos="fade-in" class="container" style="min-height: 70vh;">
      <!-- Show loading message while fetching -->
      <div v-if="loading" class="text-center mt-5">
        <p>Loading article...</p>
      </div>

      <!-- Show article content once loaded -->
      <div v-else-if="article">
        <h2 class="mb-2 appFontcolor" style="font-family:'Roboto Mono';">{{ article.title }}</h2>
        <p class="text-muted" style="color: #888 !important;">{{ article.date }}</p>
        
        <!-- Display image only if imageUrl exists -->
        <img v-if="article.imageUrl" :src="article.imageUrl" class="img-fluid my-3" style="border-radius: 12px; max-height: 400px; width: 100%; object-fit: cover;">
        
        <!-- The full story of the article, rendered as HTML -->
        <div class="text-justify" v-html="article.story"></div>

        <router-link to="/" class="btn btn-outline-light mt-4">Back to Home</router-link>
      </div>

      <!-- Show error message if article not found -->
      <div v-else class="text-center mt-5">
        <h2>Article Not Found</h2>
        <p>The news article you are looking for does not exist or has been moved.</p>
        <router-link to="/" class="btn btn-outline-light mt-3">Back to Home</router-link>
      </div>
    </div>
  `,
  created() {
    // Get the article ID from the route's parameters
    const articleId = parseInt(this.$route.params.id);

    // Load the news data and find the matching article
    loadData('data/news.json').then(allNews => {
      this.article = allNews.find(item => item.id === articleId);
      this.loading = false; // Set loading to false after data is processed
    });
  },
  mounted() {
    AOS.init({ duration: 800 });
  }
};



const routes = [
  { path: '/', component: Home },
  { path: '/research', component: Research },
  { path: '/publications', component: Publications },
  { path: '/experience', component: Experience },
  { path: '/education', component: Education },
  { path: '/awards', component: Awards },
  { path: '/contact', component: Contact },
  { path: '/news/:id', component: NewsArticle, name: 'news-article' }
];

const router = new VueRouter({ routes, mode: 'hash', scrollBehavior() { return { x: 0, y: 0 }; } });
new Vue({ el: '#app', router });
