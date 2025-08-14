import Link from 'next/link';

async function getProfiles() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profiles`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch profiles');
  }
  return res.json();
}

export default async function ProfilesPage() {
  const profiles = await getProfiles();

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {profiles.map(profile => (
          <Link href={`/profiles/${profile.id}`} key={profile.id} className="cursor-pointer">
            {/*
              KEY CHANGE 1: SETTING EXACT DIMENSIONS
              - h-[437px] is the new, correct height from your latest Figma screenshot.
            */}
            <div className="w-[354px] h-[437px] rounded-[20px] shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col">

              {/* Orange Banner (no change here) */}
              <div className="bg-orange-500 h-32 flex-shrink-0" />

              {/*
                KEY CHANGE 2: VERTICALLY CENTERING THE CONTENT
                - We make this a flex container (`flex flex-col`).
                - `justify-center` then centers the content vertically.
                - `flex-grow` ensures this div fills the remaining height.
              */}
              <div className="bg-[#F7F6F5] flex-grow flex flex-col justify-center text-center p-6">
                
                {/* Avatar positioned with a negative margin */}
                <div className="flex-shrink-0 flex justify-center -mt-20">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="rounded-full border-4 border-[#F7F6F5] h-28 w-28 object-cover"
                  />
                </div>
                
                {/* Text Content */}
                <div className="mt-4">
                  <h2 className="text-3xl font-bold text-gray-900">{profile.name}</h2>
                  <p className="text-lg text-gray-500 mt-1">{profile.bio}</p>
                </div>

              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}