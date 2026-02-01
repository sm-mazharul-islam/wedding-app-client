import React from "react";
import TeamMember from "./TeamMember";
import aboutLogo from "../../../Images/head.png";

const TeamMembers = () => {
  const team = [
    {
      id: 1,
      name: "Rynanda Eva",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis pulvinar.",
      img: "https://kitpro.site/vento/wp-content/uploads/sites/51/2021/11/portrait-of-curly-hairstyle-blonde-attractive-girl-2021-09-02-15-25-02-utc.jpg",
    },
    {
      id: 2,
      name: "Rynanda Eva",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis pulvinar.",
      img: "https://kitpro.site/vento/wp-content/uploads/sites/51/2021/11/romantic-blonde-in-black-hat-with-wide-brim-in-el-2021-09-02-15-23-35-utc.jpg",
    },
    {
      id: 3,
      name: "Rynanda Eva",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis pulvinar.",
      img: "https://kitpro.site/vento/wp-content/uploads/sites/51/2021/11/street-summer-fashion-portrait-of-young-millennial-2021-09-03-20-04-45-utc.jpg",
    },
    {
      id: 4,
      name: "Robert William",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis pulvinar.",
      img: "https://lovelove-react.wpocean.com/static/media/img-2.12d206bd2c655cb5d77e.jpg",
    },
  ];
  return (
    <div>
      <section className="bg-[#FAF7F6] py-24 px-6">
        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-20 space-y-4">
          {/* Small Eyebrow Text */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="w-12 h-[1px] bg-gray-300"></span>
            <span className="text-[11px] uppercase tracking-[0.6em] text-gray-400 font-semibold">
              Excellence in Motion
            </span>
            <span className="w-12 h-[1px] bg-gray-300"></span>
          </div>

          {/* Main Title with Serif Italic focus */}
          <h3 className="text-4xl md:text-6xl font-serif text-gray-900 leading-tight">
            Our{" "}
            <span className="italic font-light text-gray-700">Visionary</span>{" "}
            Team
          </h3>

          {/* Subtitle - Using your text but making it elegant */}
          <p className="text-gray-500 font-light italic tracking-widest text-sm max-w-lg mx-auto">
            The creative minds behind our last successfully completed projects
          </p>

          {/* Designed Divider using your aboutLogo */}
          <div className="relative flex justify-center items-center mt-8">
            <img
              src={aboutLogo}
              className="w-[300px] h-auto opacity-60 hover:opacity-100 transition-opacity duration-700"
              alt="Decorative divider"
            />
          </div>
        </div>

        {/* --- TEAM GRID --- */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 justify-center max-w-[1440px] mx-auto">
          {team.map((member) => (
            <div key={member.id} className="group">
              <TeamMember member={member} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeamMembers;
