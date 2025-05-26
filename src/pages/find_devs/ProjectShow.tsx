import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const arr = [
  "Developer 1",
  "Developer 2",
  "Developer 3",
  "Developer 4",
  "Developer 5",
  "Developer 6",
  "Developer 2",
  "Developer 3",
  "Developer 4",
  "Developer 5",
  "Developer 6",
];

const ProjectShow = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <ScrollArea className="w-full whitespace-nowrap rounded-md pb-4">
        <div className="flex space-x-4 p-1">
          {arr.map((item, index) => (
            <div
              key={index}
              className="relative bg-gray-200 dark:bg-gray-700 ring-primary ring-2 rounded-xl w-20 h-28 overflow-hidden"
            >
              {/* Background image */}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s"
                alt={`${item} background`}
                className="w-full h-full object-cover"
              />

              {/* Avatar image on top-left */}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s"
                alt={`${item} avatar`}
                className="absolute top-1 left-1 size-9 rounded-full border-2 border-white shadow-md"
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ProjectShow;
