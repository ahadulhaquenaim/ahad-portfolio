'use client';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Get to know me better
          </p>
        </div>
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            This section provides additional context about my journey, interests, and what drives me in my professional career.
            The bio information from the hero section gives you an overview, and this space can be used to elaborate further.
          </p>
        </div>
      </div>
    </section>
  );
}
