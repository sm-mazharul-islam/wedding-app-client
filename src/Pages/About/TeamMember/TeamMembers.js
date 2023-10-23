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
      <h3 className="text-center text-xl">
        Our Last project successfully completed Team
      </h3>
      <img src={aboutLogo} className="mx-auto w-[400px] h-[10px]" alt="" />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center max-w-[1440px] mx-auto">
        {team.map((member) => (
          <TeamMember key={member.id} member={member}></TeamMember>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
