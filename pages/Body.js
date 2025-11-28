import React, { useEffect, useState } from "react";

// Change this to your actual API base URL or replace with an imported BASE_URL
import BASE_URL from "../url";

const trimText = (text, maxLength = 120) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const Body = () => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        setPostsError(null);

        const res = await fetch(`${BASE_URL}/Posts`);
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();
        // Ensure it's an array
        const postsArray = Array.isArray(data) ? data : [data];

        // Optional: sort by createdAt desc (latest first)
        postsArray.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setPosts(postsArray);
      } catch (err) {
        setPostsError(err.message || "Something went wrong while loading posts");
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-12 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1 lg:pr-8">
          <h1 className="text-3xl lg:text-4xl font-semibold leading-tight mb-4">
            Disaster Management — Ready. Respond. Recover.
          </h1>
          <p className="text-slate-600 mb-6 max-w-prose">
            A lightweight, desktop-first app to report incidents, coordinate
            responders, and access safety resources during floods, fires,
            earthquakes, and other emergencies.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white rounded-md px-4 py-2 shadow"
              aria-label="Report an Incident"
            >
              Report an Incident
            </button>
            <a
              href="#learn"
              className="text-slate-700 hover:underline px-3 py-2"
            >
              Learn how it works
            </a>
          </div>
        </div>

        <div className="flex-1 w-full lg:w-1/2">
          <div className="w-full rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://news.cuanschutz.edu/hubfs/Department%20of%20Emergency%20Medicine/First%20responder%20mental%20health%20COMBAT%202.25.png"
              alt="Emergency responders working together"
              className="w-full h-72 lg:h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Latest Posts (left) + Key Features (right) */}
      <section id="learn" className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* LEFT SIDE: Latest Posts */}
          <aside className="lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>

            <div className="space-y-4">
              {loadingPosts && (
                <p className="text-sm text-slate-500">Loading posts...</p>
              )}

              {postsError && (
                <p className="text-sm text-red-600">{postsError}</p>
              )}

              {!loadingPosts && !postsError && posts.length === 0 && (
                <p className="text-sm text-slate-500">No posts yet.</p>
              )}

              {!loadingPosts &&
                !postsError &&
                posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg shadow p-4 border border-slate-100"
                  >
                    <h3 className="text-base font-semibold text-slate-900 mb-1">
                      {post.postTitle || "Untitled Post"}
                    </h3>

                    {post.postContent ? (
                      <p className="text-xs text-slate-600">
                        {trimText(post.postContent, 120)}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-500 italic">
                        No content provided.
                      </p>
                    )}

                    {post.createdAt && (
                      <p className="mt-2 text-[11px] text-slate-400">
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                    )}
                  </article>
                ))}
            </div>
          </aside>

          {/* RIGHT SIDE: Key Features */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Key features</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              <article className="bg-white rounded-lg shadow p-0 overflow-hidden flex flex-col">
                <img
                  src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=60"
                  alt="Map and location"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">
                    Live Incident Reporting
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Quickly send precise location, photos and category so
                    responders get actionable information fast.
                  </p>
                </div>
              </article>

              <article className="bg-white rounded-lg shadow p-0 overflow-hidden flex flex-col">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=60"
                  alt="Volunteers coordinating"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">
                    Responder Coordination
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Manage teams, assign tasks, and communicate in real-time to
                    reduce duplication and speed up response.
                  </p>
                </div>
              </article>

              <article className="bg-white rounded-lg shadow p-0 overflow-hidden flex flex-col">
                <img
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=60"
                  alt="Safety kit and guidance"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">
                    Preparedness Resources
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Access checklists, evacuation routes, and first-aid guides
                    tailored to different disaster types.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-8 py-8">
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg p-6 flex items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold">Join the network</h3>
            <p className="text-sm opacity-90">
              Volunteer, donate, or get trained — help your community become
              resilient.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-white text-teal-600 font-medium rounded-md px-4 py-2 shadow">
              Volunteer
            </button>
            <button className="border border-white/60 text-white rounded-md px-4 py-2">
              Donate
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Body;
