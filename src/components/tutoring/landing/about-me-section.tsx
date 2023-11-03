export default function AboutMeSection() {
  return (
    <div className="my-32">
      <h1 className="text-3xl font-semibold leading-[60px] mb-[74px]">A bit about me...</h1>
      <div className="flex flex-row gap-x-[60px]">
        <div className="col-span-7 prose">
          <p>
            Hey there, I&apos;m Aaron!
            <br />
            <br />
            I&apos;ve got over a decade of experience as a full-stack software engineer, and I&apos;m super excited to tell you a bit about my journey.
            <br />
            <br />I first dipped my toes into programming when I was pretty young, teaching myself how to create content for a niche online game. It was like discovering a whole new world! From there, I went on to teach myself modern software development, picking up languages like JavaScript, C#, and Python, and diving head first into the world of web and desktop applications.
            <br />
            <br />
            I&apos;ve had the chance to work in all sorts of industries &ndash; from FinTech and marketing to the UK public sector and pharmaceuticals. Along the way, I&apos;ve taken on various roles, like Senior Developer, Software Architect, Development Team Lead, and even Project Manager. With all this real-world experience, I&apos;m not just here to teach you how to code; I want to show you how to thrive in the ever-evolving tech scene.
            <br />
            <br />
            Since I&apos;m a self-learner myself, I totally get how to make the most of online resources. Whether you want a structured, step-by-step approach to learning or prefer to dive into specific questions or coding challenges, I&apos;m here to work with your style.
            <br />
            <br />
            🇩🇪 Oh, und wenn du dich lieber auf Deutsch unterhalten, ist das auch kein Problem - wir k&ouml;nnen darauf umsteigen!
            <br />
            <br />
            Thanks for thinking about learning with me, and I&apos;m looking forward to hearing from you soon!
          </p>
        </div>
        <div className="col-span-5 relative">
          <div className="sticky top-[50px]">
            <iframe className="rounded-xl" width="500" height="333" src="https://www.youtube.com/embed/JDs9tFBFif0?si=u70at-f3dnBS8xXc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

            <h2 className="text-xl font-semibold leading-[65px] mt-[35px]">Technologies I work with</h2>
            <div className="prose prose-tut">
              <ul>
                <li>
                  <span>
                    JavaScript, TypeScript
                    <br />
                  </span>
                </li>
                <li>
                  <span>
                    React, Next.js, Angular, Aurelia
                    <br />
                  </span>
                </li>
                <li>
                  <span>
                    WordPress, Umbraco, Sitecore
                    <br />
                  </span>
                </li>
                <li>
                  <span>
                    Tailwindcss, CSS, SASS, LESS
                    <br />
                  </span>
                </li>
                <li>
                  <span>
                    nodejs, Python
                    <br />
                  </span>
                </li>
                <li>
                  <span>
                    C#, ASP.NET
                    <br />
                  </span>
                </li>
                <li>
                  <span>
                    SQL Server, MySQL, MongoDB
                    <br />
                  </span>
                </li>
                <li>
                  <span>
                    AWS, GCP, Azure, DigitalOcean
                    <br />
                  </span>
                </li>
                <li>
                  <span>GitHub, GitLab</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
