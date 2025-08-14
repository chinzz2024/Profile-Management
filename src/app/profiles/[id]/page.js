import Link from 'next/link';
import { FiDownload, FiMail, FiPhone, FiArrowLeft, FiPlayCircle, FiGithub, FiLinkedin } from 'react-icons/fi';
import ProjectCarousel from '../../components/ProjectCarousel';

async function getProfile(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profiles/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch profile');
  }
  return res.json();
}

export default async function ProfileDetailPage({ params }) {
  const profile = await getProfile(params.id);
  const details = profile.details || {};
  const socials = details.socials || {};

  const navLinks = [
    { lines: ["Core Skills & Technical", "Proficiencies"] },
    { lines: ["Professional Journey &", "Internship Roles"] },
    { lines: ["Case Insights & Key", "Projects"] },
    { lines: ["Learning & Academic", "Milestones"] },
    { lines: ["Endorsements from", "Mentors & Peers"] },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 pt-8">
        
        {/* Back to Profiles Button */}
        <Link href="/profiles" className="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-900 mb-8">
          <FiArrowLeft />
          <span>Back to Profiles</span>
        </Link>
        
        {/* Banner and Profile Header Section */}
        <div className="relative">
          {/* Banner Section */}
          <div 
            className="rounded-2xl h-80 relative"
            style={{
              backgroundImage: "url('/banner-background.png')",
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Buttons positioned at the bottom of the banner */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white z-10">
              <div className="flex items-center space-x-6">
                <a href={`mailto:${details.email}`} className="flex items-center space-x-2 hover:underline">
                  <FiMail />
                  <span>Email</span>
                </a>
                <a href={`tel:${details.phone}`} className="flex items-center space-x-2 hover:underline">
                  <FiPhone />
                  <span>Phone</span>
                </a>
              </div>
              <a href={details.resumeUrl} download className="flex items-center space-x-2 border border-white rounded-full py-2 px-5 hover:bg-white/20 transition-colors">
                <FiDownload />
                <span>Download My Resume</span>
              </a>
            </div>
          </div>

          {/* Avatar and Name Section */}
          <div className="relative text-center -mt-32">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="rounded-full h-60 w-60 object-cover shadow-lg border-4 border-white inline-block"
            />
            <div className="mt-4">
              <h1 className="text-5xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-gray-600 text-lg mt-1">{profile.bio}</p>

              <a 
                href="#visual-resume" 
                className="mt-6 inline-flex items-center justify-center mx-auto space-x-2 bg-orange-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-orange-600 transition-colors shadow-md"
              >
                <FiPlayCircle size={20} />
                <span>Watch my Visual Resume Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Links Section */}
        <div className="bg-gray-50 rounded-2xl shadow-sm p-6 my-12">
            <div className="flex items-start justify-between text-center">
                {navLinks.map((link) => (
                    <a 
                        key={link.lines[0]}
                        href="#"
                        className="text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium px-2 flex-1"
                    >
                        {link.lines.map((line, index) => (
                          <span key={index} className="block">{line}</span>
                        ))}
                    </a>
                ))}
            </div>
        </div>
        
        {/* About Section */}
        <section className="text-center pb-16">
          <div className="max-w-3xl mx-auto">
            {Array.isArray(details.about) ? (
              details.about.map((paragraph, index) => (
                <p key={index} className="text-gray-600 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {details.about}
              </p>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-8">
          <div className="flex justify-center items-center flex-wrap gap-x-8 gap-y-6">
            {details.skills?.map((skill, index) => (
              <img key={index} src={skill} alt="Skill logo" className="h-20 w-20 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
            ))}
          </div>
        </section>

        {/* Projects Carousel Section */}
        <ProjectCarousel projects={details.projects || []} />

        {/* Visual Resume Section */}
        <section id="visual-resume" className="py-12">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Visual Resume</h2>
          <div className="max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden">
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe 
                src={details.youtubeUrl}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <div className="mt-16">
        {/* Orange Gradient Section */}
        <div
          className="bg-gradient-to-r from-orange-400 to-red-500 text-center text-white rounded-2xl mx-auto flex flex-col justify-center items-center"
          style={{ width: '1000px', height: '200px' }}
        >
          <div className="container mx-auto h-full flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold mb-3">Connect with {profile.name}</h2>
            
            {/* Download Button */}
            <div className="mb-2">
              <a 
                href={details.resumeUrl} 
                download 
                className="inline-flex items-center gap-2 bg-white text-orange-500 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-all shadow-md hover:shadow-lg text-base"
              >
                <FiDownload size={20} />
                <span>Download My Resume</span>
              </a>
            </div>
          </div>
        </div>

        {/* Social Links Row - Outside orange box */}
        <div className="flex justify-between items-center w-full max-w-3xl px-4 mx-auto mt-6">
          {/* Left Side */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1 hover:border-orange-500 transition-colors">
              <FiMail size={16} className="text-grey-500" />
              <a href={`mailto:${details.email}`} className="text-sm text-gray-700 hover:text-orange-500">Email</a>
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1 hover:border-orange-500 transition-colors">
              <FiPhone size={16} className="text-grey-500" />
              <a href={`tel:${details.phone}`} className="text-sm text-gray-700 hover:text-orange-500">Phone</a>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1 hover:border-orange-500 transition-colors">
              <FiGithub size={16} className="text-grey-500" />
              <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:text-orange-500">GitHub</a>
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1 hover:border-orange-500 transition-colors">
              <FiLinkedin size={16} className="text-grey-500" />
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:text-orange-500">LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-300 my-4 w-full max-w-3xl mx-auto" />

        {/* Minimal Footer */}
        <footer className="text-center py-3 bg-white">
          <p className="text-gray-500 text-xs">© {new Date().getFullYear()}  All rights reserved</p>
        </footer>
      </div>
    </div>
  );
}
