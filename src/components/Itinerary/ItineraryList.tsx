import { Local } from "@/types";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "react-beautiful-dnd";

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export type ItineraryListProps = {
  locals: Local[];
  onRemove: (local: Local) => void;
  onReorder: (locals: Local[]) => void;
};

export const ItineraryList: React.FC<ItineraryListProps> = ({
  locals,
  onRemove,
  onReorder,
}) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = reorder(
      locals,
      result.source.index,
      result.destination.index
    );

    onReorder(items);
  };

  return (
    <ol role="list" className="max-h-[60vh] overflow-y-auto px-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <li
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="text-left"
            >
              {locals.map((local, index) => (
                <Draggable
                  key={local.id}
                  index={index}
                  draggableId={local.id.toString()}
                >
                  {(provided) => (
                    <div
                      className="flex items-center justify-between"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Link href={`/local/${local.slug}`} className="block">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex flex-wrap items-center justify-between">
                            <p className="text-lg font-semibold">
                              {local.name}
                            </p>
                            <div className="ml-2 flex flex-shrink-0">
                              <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                {local.main_category.name}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="flex">
                              <p className="flex items-center text-left text-xs text-gray-500 md:text-sm">
                                <MapPinIcon
                                  className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>{local.address}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <button
                        onClick={() => onRemove(local)}
                        title="Remover do roteiro"
                        className="flex items-center justify-center rounded-full border border-transparent bg-rose-500 p-1 text-sm font-medium text-white shadow-sm hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
                      >
                        <span className="sr-only">Remover do roteiro</span>
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </li>
          )}
        </Droppable>
      </DragDropContext>
    </ol>
  );
};
