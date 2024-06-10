/*==================== MENU SHOW AND HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");
/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  //When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close")
    this.parentNode.className = "skills__content skills__open";
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});
/*==================== QUALIFICATION TABS ====================*/

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});
/*==================== PORTFOLIO SWIPER  ====================*/
let swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== TESTIMONIAL ====================*/

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/

function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== SEND MESSAGE TO OWNER ====================*/

const form = document.querySelector("#contact-form");
const button = document.querySelector("#send-button");
const successMessage = document.querySelector("#success-message");
const invalidMessage = document.querySelector("#invalid-message");

function isInputValid(input) {
  return input.value.trim() !== "";
}

button.addEventListener("click", function (event) {
  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const projectInput = form.querySelector('input[name="project"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  if (
    !isInputValid(nameInput) ||
    !isInputValid(emailInput) ||
    !isInputValid(projectInput) ||
    !isInputValid(messageInput)
  ) {
    event.preventDefault();
    invalidMessage.classList.remove("hidden");
    successMessage.classList.add("hidden");
    console.log("Preencha todos os campos!");
  } else {
    invalidMessage.classList.add("hidden");
  }

  event.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  const project = projectInput.value;
  const message = messageInput.value;

  const formData = {
    name: name,
    email: email,
    project: project,
    message: message,
  };

  sendDataToServer(formData);
});

function sendDataToServer(formData) {
  fetch("https://backend-portfolio-9eys.onrender.com/project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        setTimeout(function () {
          successMessage.classList.remove("hidden");
          setTimeout(function () {
            successMessage.classList.add("hidden");
          }, 3000);
        }, 1000);
        console.log("Data sent successfully");
      } else {
        console.log("Error sending data to server");
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

/*==================== CHANGE LANGUAGE HANDLER ====================*/
let language = 'en'

document.getElementById('lang-button').addEventListener('click', () => setLanguage((language == 'en'  ? 'pt': 'en' )));

function setLanguage(lang){

  if(language == 'en'){
    language = 'pt';
  } else {
    language = 'en';
  }

  console.log(lang);
  const content = {
    en: {
      about: "About",
      skills: "Skills",
      services: "Services",
      portfolio: "Portfolio",
      contact_me: "Contact me",
      home_title: "Hi, I'am Ryan",
      home_subtitle: "Web Developer",
      home_description: "A higher education student who loves to study and work as a programmer. Very qualified, with great ability to learn new things. I have a big dream of helping people to combine a productive routine without having to put aside what they love.",
      contact_button: "Contact Me",
      about_title: "About Me",
      about_subtitle: "My introduction",
      about_description: "I am a higher education student, I like online games and geek culture (hence the nickname Ka9ddc) I am also very interested in acquiring new knowledge, especially when they are related to technology and mental health. My goal is to be able to transform complex problems into easy and accessible things for everyone, I believe that programming makes me able to complete this goal.",
      about_info_experience1: "Years",
      about_info_experience2: "experience",
      about_info_project1: "Completed",
      about_info_project2: "project",
      about_info_company1: "Companies",
      about_info_company2: "worked",
      skills_section_title: "Skills",
      skills_section_subtitle: "My technical level",
      skills_frontend_title:"Frontend Developer",
      skills_frontend_subtitle: "More than 1 year",
      skills_backend_title:"Backend Developer",
      skills_backend_subtitle: "More than 1 year",
      services_section_title: "Services",
      services_section_subtitle: "What I offer",
      services_title_backend1: "Backend",
      services_title_backend2: "Developer",
      services_title_frontend1: "Frontend",
      services_title_frontend2: "Developer",
      services_title_database1: "Database",
      services_title_database2: "Management",
      services_modal_backend_text1: "I architect and develop the back-end infrastructure.",
      services_modal_backend_text2: "I can fortify your applications with efficient and scalable solutions.",
      services_modal_backend_text3: "I can craft robust and secure systems that handle data management, logic, and integrations seamlessly.",
      services_modal_backend_text4: "I optimize your back-end for performance, enabling faster response times, efficient data processing, and a reliable foundation for your digital services.",
      services_modal_frontend_text1: "I specialize in front-end development, creating captivating user interfaces that engage users.",
      services_modal_frontend_text2: "I craft visually appealing and responsive websites that provide an intuitive and seamless user experience.",
      services_modal_frontend_text3: "I optimize front-end performance, delivering fast-loading web pages and smooth interactions to enhance user satisfaction",
      services_modal_frontend_text4: "I bring designs to life with clean and efficient code, implementing interactive and responsive elements",
      services_modal_database_text1: "I ensure data security by implementing proper access controls, encryption techniques, and backup strategies.",
      services_modal_database_text2: "I have experience in designing database schemas that meet specific application requirements and support efficient data retrieval.",
      services_modal_database_text3: "I manage databases handling complex data structures and creating robust systems for seamless information management.",
      services_modal_database_text4: "I stay updated with the latest trends and advancements in database technologies to provide modern and efficient solutions.",
      portfolio_section_title: "Portfolio",
      portfolio_section_subtitle: "Most recent work",
      portfolio_description1: "A personal blog made using NextJs, GraphQL, JavaScript thatposts on ways to improve your productivity. In the future Iplan to implement a study room system.",
      portfolio_description2: "Web application that using a DALL-E API can generate images created by AI from texts. It was built with React, JavaScript, Cloudinary and the OpenAI API.",
      portfolio_description3: "A simple finance control application. It is built using Next, Node.JS and Firebase. The focus of this application is to help the user organize themselves financially.",
      project_section_title: "You have a new project",
      project_section_description: "Contact me and talk about your project.",
      contact_section_title: "Contact Me",
      contact_section_subtitle: "Get in touch",
      phone_contact_title: "Call Me",
      location_contact_title: "Location",
      location_contact_subtitle: "Brasília, Brazil",
      name_contact_label: "Name",
      project_contact_label: "Project",
      message_contact_label: "Message",
      send_message_button: "Send Message",
      invalid_message: "All fields are required!",
      success_message: "Message sent successfully!",
      footer_subtitle: "Web Developer",
      footer_service: "Service",
      footer_portfolio: "Portfolio",
      footer_contact: "Contact",


    },
    pt: {
      about: "Sobre",
      skills: "Habilidades",
      services: "Serviços",
      portfolio: "Portfólio",
      contact_me: "Contato",
      home_title: "Olá, eu sou o Ryan",
      home_subtitle: "Desenvolvedor Web",
      home_description: "Um estudante do ensino superior que ama estudar e trabalhar com programação. Muito qualificado e com ótima habilidade para aprender novas coisas. Tenho um grande sonho de ajudar as pessoas a combinarem uma rotina produtiva sem ter que deixar de lado o que elas amam fazer.",
      contact_button: "Contate Me",
      about_title: "Sobre Mim",
      about_subtitle: "Minha introdução",
      about_description: "Sou estudante do ensino superior, gosto de jogos online e da cultura geek (daí o apelido Ka9ddc). Também tenho muito interesse em adquirir novos conhecimentos, principalmente quando estão relacionados à tecnologia e saúde mental. Meu objetivo é conseguir transformar problemas complexos em coisas fáceis e acessíveis a todos, acredito que a programação me torna capaz de completar esse objetivo.",
      about_info_experience1: "Anos de",
      about_info_experience2: "Experiência",
      about_info_project1: "Projetos",
      about_info_project2: "completos",
      about_info_company1: "Empresas",
      about_info_company2: "trabalhadas",
      skills_section_title:"Habilidades",
      skills_section_subtitle: "Meu nível técnico",
      skills_frontend_title:"Desenvolvedor Frontend",
      skills_frontend_subtitle: "Mais de 1 ano",
      skills_backend_title:"Desenvolvedor Backend",
      skills_backend_subtitle: "Mais de 1 ano",
      services_section_title: "Serviços",
      services_section_subtitle: "O que eu ofereço",
      services_title_backend1: "Desenvolvedor",
      services_title_backend2: "Backend",
      services_title_frontend1: "Desenvolvedor",
      services_title_frontend2: "Frontend",
      services_title_database1: "Gerenciamento de",
      services_title_database2: "Banco de dados",
      services_modal_backend_text1: "Eu arquiteto e desenvolvo a infraestrutura de back-end.",
      services_modal_backend_text2: "Posso fortalecer suas aplicações com soluções eficientes e escaláveis.",
      services_modal_backend_text3: "Posso criar sistemas robustos e seguros que lidam perfeitamente com gerenciamento de dados, lógica e integrações.",
      services_modal_backend_text4: "Otimizo o desempenho do seu back-end, permitindo tempos de resposta mais rápidos, processamento de dados eficiente e uma base confiável para seus serviços digitais.",
      services_modal_frontend_text1: "Sou especialista em desenvolvimento front-end, criando interfaces de usuário cativantes que envolvem os usuários.",
      services_modal_frontend_text2: "Faço sites visualmente atraentes e responsivos que entregam uma experiência de usuário intuitiva e agradável.",
      services_modal_frontend_text3: "Otimizo o desempenho do front-end, entregando páginas da web de carregamento rápido e interações suaves para aumentar a satisfação do usuário.",
      services_modal_frontend_text4: "Dou vida aos designs com código limpo e eficiente, implementando elementos interativos e responsivos.",
      services_modal_database_text1: "Garanto a segurança dos dados implementando controles de acesso, técnicas de criptografia e estratégias de backup adequados.",
      services_modal_database_text2: "Tenho experiência em projetar esquemas de banco de dados que atendam a requisitos específicos de aplicativos.",
      services_modal_database_text3: "Gerencio bancos de dados, lidando com estruturas de dados complexas e criando sistemas robustos para gerenciamento contínuo de informações.",
      services_modal_database_text4: "Me mantenho atualizado com as tendências e avanços em tecnologias de banco de dados para fornecer soluções modernas e eficientes.",
      portfolio_section_title: "Portfólio",
      portfolio_section_subtitle: "Trabalhos mais recentes",
      portfolio_description1: "Um blog pessoal feito usando NextJs, GraphQL, JavaScript que posta sobre maneiras de melhorar sua produtividade. No futuro pretendo implementar um sistema de sala de estudo.",
      portfolio_description2: "Aplicativo web que usando a API do DALL-E pode gerar imagens criadas por IA a partir de textos. Foi construído com React, JavaScript, Cloudinary e API da OpenAI.",
      portfolio_description3: "Um aplicativo simples de controle financeiro. Ele é construído usando Next, Node.JS e Firebase. O foco deste aplicativo é ajudar o usuário a se organizar financeiramente.",
      project_section_title: "Você tem um projeto em mente",
      project_section_description: "Me contate e fale sobre seu projeto",
      contact_section_title: "Contate me",
      contact_section_subtitle: "Entre em contato",
      phone_contact_title: "Ligue para mim",
      location_contact_title: "Localização",
      location_contact_subtitle: "Brasília, Brasil",
      name_contact_label: "Nome",
      project_contact_label: "Projeto",
      message_contact_label: "Mensagem",
      send_message_button: "Enviar Mensagem",
      invalid_message: "Todos os campos são necessários!",
      success_message: "Mensagem enviada com sucesso!",
      footer_subtitle: "Desenvolvedor Web",
      footer_service: "Serviços",
      footer_portfolio: "Portfólio",
      footer_contact: "Contato",
    }
  }

  document.getElementsByClassName('nav__link')[1].textContent = content[lang].about;
  document.getElementsByClassName('nav__link')[2].textContent = content[lang].skills;
  document.getElementsByClassName('nav__link')[3].textContent = content[lang].services;
  document.getElementsByClassName('nav__link')[4].textContent = content[lang].portfolio;
  document.getElementsByClassName('nav__link')[5].textContent = content[lang].contact_me;
  document.querySelector('.home__title').textContent = content[lang].home_title;
  document.querySelector('.home__subtitle').textContent = content[lang].home_subtitle;
  document.querySelector('.home__description').textContent = content[lang].home_description;
  document.getElementById('contact-button').firstChild.textContent = content[lang].contact_button;
  document.getElementsByClassName('section__title')[0].textContent = content[lang].about_title;
  document.getElementsByClassName('section__subtitle')[0].textContent = content[lang].about_subtitle;
  document.querySelector('.about__description').textContent = content[lang].about_description;
  document.getElementsByClassName('about__info-name')[0].firstChild.textContent = content[lang].about_info_experience1;
  document.getElementsByClassName('about__info-name')[1].firstChild.textContent = content[lang].about_info_project1;
  document.getElementsByClassName('about__info-name')[2].firstChild.textContent = content[lang].about_info_company1;
  document.getElementsByClassName('about__info-name')[0].childNodes[2].textContent = content[lang].about_info_experience2;
  document.getElementsByClassName('about__info-name')[1].childNodes[2].textContent = content[lang].about_info_project2;
  document.getElementsByClassName('about__info-name')[2].childNodes[2].textContent = content[lang].about_info_company2;
  document.getElementsByClassName('section__title')[1].textContent = content[lang].skills_section_title;
  document.getElementsByClassName('section__subtitle')[1].textContent = content[lang].skills_section_subtitle;
  document.getElementsByClassName('skills__title')[0].textContent = content[lang].skills_frontend_title;
  document.getElementsByClassName('skills__subtitle')[0].textContent = content[lang].skills_frontend_subtitle;
  document.getElementsByClassName('skills__title')[1].textContent = content[lang].skills_backend_title;
  document.getElementsByClassName('skills__subtitle')[1].textContent = content[lang].skills_backend_subtitle;
  document.getElementsByClassName('section__title')[2].textContent = content[lang].services_section_title;
  document.getElementsByClassName('section__subtitle')[2].textContent = content[lang].services_section_subtitle;
  document.getElementsByClassName('services__title')[0].firstChild.textContent = content[lang].services_title_backend1;
  document.getElementsByClassName('services__title')[0].childNodes[2].textContent = content[lang].services_title_backend2;
  document.getElementsByClassName('services__title')[1].firstChild.textContent = content[lang].services_title_frontend1;
  document.getElementsByClassName('services__title')[1].childNodes[2].textContent = content[lang].services_title_frontend2;
  document.getElementsByClassName('services__title')[2].firstChild.textContent = content[lang].services_title_database1;
  document.getElementsByClassName('services__title')[2].childNodes[2].textContent = content[lang].services_title_database2;
  document.getElementsByClassName('services__modal-title')[0].firstChild.textContent = content[lang].services_title_backend1;
  document.getElementsByClassName('services__modal-title')[0].childNodes[2].textContent = content[lang].services_title_backend2;
  document.getElementsByClassName('services__modal-title')[1].firstChild.textContent = content[lang].services_title_frontend1;
  document.getElementsByClassName('services__modal-title')[1].childNodes[2].textContent = content[lang].services_title_frontend2;
  document.getElementsByClassName('services__modal-title')[2].firstChild.textContent = content[lang].services_title_database1;
  document.getElementsByClassName('services__modal-title')[2].childNodes[2].textContent = content[lang].services_title_database2;
  document.getElementsByClassName('services__modal-service-text')[0].textContent = content[lang].services_modal_backend_text1;
  document.getElementsByClassName('services__modal-service-text')[1].textContent = content[lang].services_modal_backend_text2;
  document.getElementsByClassName('services__modal-service-text')[2].textContent = content[lang].services_modal_backend_text3;
  document.getElementsByClassName('services__modal-service-text')[3].textContent = content[lang].services_modal_backend_text4;
  document.getElementsByClassName('services__modal-service-text')[4].textContent = content[lang].services_modal_frontend_text1;
  document.getElementsByClassName('services__modal-service-text')[5].textContent = content[lang].services_modal_frontend_text2;
  document.getElementsByClassName('services__modal-service-text')[6].textContent = content[lang].services_modal_frontend_text3;
  document.getElementsByClassName('services__modal-service-text')[7].textContent = content[lang].services_modal_frontend_text4;
  document.getElementsByClassName('services__modal-service-text')[8].textContent = content[lang].services_modal_database_text1;
  document.getElementsByClassName('services__modal-service-text')[9].textContent = content[lang].services_modal_database_text2;
  document.getElementsByClassName('services__modal-service-text')[10].textContent = content[lang].services_modal_database_text3;
  document.getElementsByClassName('services__modal-service-text')[11].textContent = content[lang].services_modal_database_text4;
  document.getElementsByClassName('section__title')[3].textContent = content[lang].portfolio_section_title;
  document.getElementsByClassName('section__subtitle')[3].textContent = content[lang].portfolio_section_subtitle;
  document.getElementsByClassName('portfolio__description')[0].textContent = content[lang].portfolio_description3;
  document.getElementsByClassName('portfolio__description')[1].textContent = content[lang].portfolio_description1;
  document.getElementsByClassName('portfolio__description')[2].textContent = content[lang].portfolio_description2;
  document.getElementsByClassName('portfolio__description')[3].textContent = content[lang].portfolio_description3;
  document.getElementsByClassName('portfolio__description')[4].textContent = content[lang].portfolio_description1;
  document.querySelector('.project__title').textContent = content[lang].project_section_title;
  document.querySelector('.project__description').textContent = content[lang].project_section_description;
  document.getElementById('project-contact-button').firstChild.textContent = content[lang].contact_button;
  document.getElementsByClassName('section__title')[4].textContent = content[lang].contact_section_title;
  document.getElementsByClassName('section__subtitle')[4].textContent = content[lang].contact_section_subtitle;
  document.getElementsByClassName('contact__title')[0].textContent = content[lang].phone_contact_title;
  document.getElementsByClassName('contact__title')[2].textContent = content[lang].location_contact_title;
  document.getElementsByClassName('contact__subtitle')[2].textContent = content[lang].location_contact_subtitle;
  document.getElementsByClassName('contact__label')[0].textContent = content[lang].name_contact_label;
  document.getElementsByClassName('contact__label')[2].textContent = content[lang].project_contact_label;
  document.getElementsByClassName('contact__label')[3].textContent = content[lang].message_contact_label;
  document.getElementById('send-button').firstChild.textContent = content[lang].send_message_button;
  document.getElementById('invalid-message').textContent = content[lang].invalid_message;
  document.getElementById('success-message').textContent = content[lang].success_message;
  document.getElementsByClassName('footer__subtitle')[0].textContent = content[lang].footer_subtitle;
  document.getElementsByClassName('footer__link')[0].textContent = content[lang].footer_service;
  document.getElementsByClassName('footer__link')[1].textContent = content[lang].footer_portfolio;
  document.getElementsByClassName('footer__link')[2].textContent = content[lang].footer_contact;
  
  

}