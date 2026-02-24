import { Controller } from "react-hook-form";
import type {
  Control,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  Path,
  PathValue,
} from "react-hook-form";
import type { TextareaHTMLAttributes } from "react";

interface Props<T extends FieldValues>
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  disabled?: boolean;
  parentClassName?: string;
  control: Control<T>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>>;
  value?: PathValue<T, Path<T>>;
  label?: string;
  maxLength?: number;
  required?: boolean;
}

const TextAreaWrapper = <TFormValues extends FieldValues>({
  className,
  parentClassName,
  error,
  label,
  control,
  required,
  name,
  disabled,
  maxLength,
  value,
  ...props
}: Props<TFormValues>) => {
  // Function to restrict input to maxLength
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (maxLength)
      e.currentTarget.value = e.currentTarget.value.slice(0, maxLength);
  };

  return (
    <div className={`${parentClassName || ''}`}>
      {label && (
        <label className="block text-gray-700 font-medium mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <Controller
        render={({ field }) => (
          <textarea
            {...field}
            className={`input-field ${className || ''} ${
              error ? 'border-red-500' : ''
            }`}
            onChange={(e) => {
              field.onChange(e);
              if (props.onChange) props.onChange(e);
            }}
            disabled={disabled || false}
            {...props}
            onInput={handleInput}
          />
        )}
        name={name as Path<TFormValues>}
        defaultValue={
          value || ("" as PathValue<TFormValues, Path<TFormValues>>)
        }
        control={control}
      />
      
      {error && (
        <p className="text-red-500 text-sm mt-1">{error?.message as string}</p>
      )}
    </div>
  );
};

export default TextAreaWrapper;
