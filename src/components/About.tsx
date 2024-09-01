import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Image from "next/image";

export default function About() {
  return (
    <>
      <span id="qui-sommes-nous" className="flex items-center">
        <span className="h-px flex-1 bg-black ml-28"></span>
        <span className="shrink-0 px-6 text-2xl font-bold">
          Qui sommes-nous ?
        </span>
        <span className="h-px flex-1 bg-black mr-28"></span>
      </span>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
              {" "}
              Nous sommes une équipe passionnée de trois développeurs dévoués à
              révolutionner l&apos;apprentissage des langages informatiques.
              Ensemble, nous formons le cœur et l&apos;esprit derrière Isishare.
            </p>
          </div>
          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a>
                <Image
                  className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                  src="/florian.jpg"
                  width={250}
                  height={250}
                  alt="Jese Avatar"
                />
              </a>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">CASTELLIER Florian</a>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  Développeur Full-Stack
                </span>
                <br />
                <AlertDialog>
                  <AlertDialogTrigger className="border-solid border border-gray-500 bg-white rounded-md px-4 py-2">
                    En savoir plus
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Informations</AlertDialogTitle>
                      <AlertDialogDescription>
                        Il notre expert en bases de données et développement
                        backend, Florian Castellier, est le pilier sur lequel
                        repose la robustesse de notre système. Avec une solide
                        expérience dans la conception et l&apos;optimisation de
                        bases de données, Florian veille à ce que notre
                        plateforme soit à la fois efficace et évolutive.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Retour</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a>
                <Image
                  className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                  src="/adrien.jpg"
                  width={250}
                  height={250}
                  alt="Jese Avatar"
                />
              </a>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">BRON Adrien</a>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  Développeur Full-Stack
                </span>
                <br />
                <AlertDialog>
                  <AlertDialogTrigger className="border-solid border border-gray-500 bg-white rounded-md px-4 py-2">
                    En savoir plus
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Informations</AlertDialogTitle>
                      <AlertDialogDescription>
                        Il est le cerveau polyvalent de notre équipe. Son
                        expertise s&apos;étend à divers aspects du développement
                        logiciel, de la conception à l&apos;implémentation.
                        Touche-à-tout, Adrien est le moteur de l&apos;innovation
                        chez Isishare, apportant des idées fraîches et des
                        solutions créatives à chaque étape du processus de
                        développement.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Retour</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a>
              <Image
                  className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                  src="/andy.jpg"
                  width={250}
                  height={250}
                  alt="Jese Avatar"
                />
              </a>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">CANAC Andy</a>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  Développeur Full-Stack
                </span>
                <br />
                <AlertDialog>
                  <AlertDialogTrigger className="border-solid border border-gray-500 bg-white rounded-md px-4 py-2">
                    En savoir plus
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Informations</AlertDialogTitle>
                      <AlertDialogDescription>
                        Il est notre spécialiste du style et du design. Sa
                        passion pour l&apos;esthétique et l&apos;expérience
                        utilisateur se traduit par une interface utilisateur
                        intuitive et attrayante pour notre plateforme. Andy
                        s&apos;efforce de rendre l&apos;apprentissage sur
                        Isishare non seulement enrichissant sur le plan
                        éducatif, mais aussi agréable visuellement.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Retour</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
