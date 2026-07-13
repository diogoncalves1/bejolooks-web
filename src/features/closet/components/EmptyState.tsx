import { Shirt, SearchX } from "lucide-react";

interface EmptyStateProps {
  /** true quando o armário não tem items nenhuns; false quando é o filtro que não encontra nada */
  isWardrobeEmpty: boolean;
  onClearFilter?: () => void;
}

export function EmptyState({ isWardrobeEmpty, onClearFilter }: EmptyStateProps) {
  const Icon = isWardrobeEmpty ? Shirt : SearchX;

  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
        <Icon className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
      </span>

      {isWardrobeEmpty ? (
        <>
          <h2 className="text-lg font-bold text-foreground">
            O teu armário está vazio
          </h2>
          <p className="max-w-xs text-sm text-muted-foreground">
            Ainda não adicionaste nenhuma peça. Começa a construir o teu
            armário digital para criares os teus próprios looks.
          </p>
        </>
      ) : (
        <>
          <h2 className="text-lg font-bold text-foreground">
            Sem peças nesta categoria
          </h2>
          <p className="max-w-xs text-sm text-muted-foreground">
            Não encontrámos nenhuma peça para o filtro selecionado.
          </p>
          {onClearFilter && (
            <button
              type="button"
              onClick={onClearFilter}
              className="mt-1 rounded-full bg-primary px-4 py-2 text-sm font-bold text-foreground transition-transform hover:scale-105 active:scale-95"
            >
              Ver todas as peças
            </button>
          )}
        </>
      )}
    </div>
  );
}
