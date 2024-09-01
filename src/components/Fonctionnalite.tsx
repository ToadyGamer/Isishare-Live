import Image from "next/image";
export default function Fonctionnalite() {
  return (
    <>
      <span id="fonctionnalité" className="flex items-center">
        <span className="h-px flex-1 bg-black ml-28"></span>
        <span className="shrink-0 px-6 text-2xl font-bold">
          Fonctionnalitées
        </span>
        <span className="h-px flex-1 bg-black mr-28"></span>
      </span>
      <section className="bg-white">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-black sm:text-lg">
            <p className="mb-4">
              Isishare est une application innovante qui permet de partager et d&apos;acquérir des compétences en connectant les utilisateurs entre eux. Grâce à Isishare, vous pouvez rejoindre des groupes d&apos;apprentissage sur des sujets qui vous passionnent, entrer en contact avec des personnes partageant les mêmes intérêts, et échanger directement avec elles pour élargir vos connaissances. L&apos;application facilite les connexions et les échanges de compétences pour un apprentissage collaboratif et enrichissant.
            </p>
          </div>
          <div className="grid grid-cols gap-4 mt-8">
            <Image
              className="w-full rounded-lg"
              src="/fonct.svg"
              width={50}
              height={50}
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
}
