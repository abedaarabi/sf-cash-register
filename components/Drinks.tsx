import * as React from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "../context/AuthContext";
import { admin } from "../helper/emailAdmin";
import { Button } from "./ui/Button";
import {
  IconChevronDown,
  IconChevronRight,
  IconCocktail,
  IconPencil,
  IconTrash,
} from "./ui/icons";

export function Drinks({
  img,
  name,
  description,
  prise,
  recipe,
  id,
  preparation,
}: any) {
  const { user } = useAuth();
  const [isHide, setIsHide] = React.useState(false);
  const [imageFailed, setImageFailed] = React.useState(false);

  const deleteDrinkById = async (id: any) => {
    return await axios.delete("api/drinks/drink", {
      data: {
        id,
      },
    });
  };

  const useDeleteDrink = () => {
    const queryClinet = useQueryClient();
    return useMutation(deleteDrinkById, {
      onSuccess: () => {
        queryClinet.invalidateQueries("drinks");
      },
    });
  };

  const { mutate } = useDeleteDrink();

  const rRecipe = JSON.parse(recipe);

  const deleteDrink = (id: string) => {
    mutate(id);
  };

  const canManage =
    admin.includes(user?.email) || user?.email === "yas.kh24@gmail.com";

  return (
    <article className="card-interactive flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-gradient-to-br from-brand-100 to-sky-100">
        {img && !imageFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={name}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-brand-400">
            <IconCocktail className="h-12 w-12" />
          </span>
        )}
        <span className="pill absolute right-3 top-3 bg-surface-inverted/80 text-white backdrop-blur">
          {prise} kr
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-base font-bold tracking-tight text-ink">{name}</h3>
          <p className="mt-1 line-clamp-3 text-sm text-ink-muted">
            {description}
          </p>
        </div>

        {user && (
          <div className="mt-auto">
            <button
              type="button"
              onClick={() => setIsHide(!isHide)}
              aria-expanded={isHide}
              className="flex w-full items-center justify-between gap-2 rounded-xl bg-surface-sunken px-3 py-2.5 text-sm font-semibold text-ink transition hover:bg-brand-50 hover:text-brand-700"
            >
              Recipe
              <span className="text-ink-muted">
                {isHide ? (
                  <IconChevronDown className="h-4 w-4" />
                ) : (
                  <IconChevronRight className="h-4 w-4" />
                )}
              </span>
            </button>

            {isHide && (
              <div className="mt-3 animate-fade-in space-y-3 rounded-xl border border-line bg-surface-muted/60 p-3">
                <ul className="space-y-1.5">
                  {rRecipe?.map((item: string, idx: any) => (
                    <li
                      key={idx}
                      className="flex gap-2 text-sm text-ink-muted before:mt-1.5 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-brand-400"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                {preparation && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">
                      Preparation
                    </p>
                    <p className="mt-1 text-sm text-ink-muted">{preparation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {canManage && (
          <div className="flex gap-2 border-t border-line pt-3">
            <Button
              size="sm"
              variant="secondary"
              className="flex-1"
              icon={<IconPencil className="h-4 w-4" />}
              href={{
                pathname: `/drinkspanel`,
                query: {
                  id: id,
                },
              }}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="danger"
              className="flex-1"
              icon={<IconTrash className="h-4 w-4" />}
              onClick={() => deleteDrink(id)}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
