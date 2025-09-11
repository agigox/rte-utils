# Icons Usage Guide

After `npm install rte-utils`, you can import and use the icons in the following ways:

## Individual Icon Imports

```typescript
import { SendIcon, EditIcon, SuccessIcon } from 'rte-utils';

function MyComponent() {
  return (
    <div>
      <SendIcon size={24} color="#009CDF" />
      <EditIcon size={20} disabled={false} />
      <SuccessIcon size={16} />
    </div>
  );
}
```

## Icons Object Import

```typescript
import { Icons } from 'rte-utils';

function MyComponent() {
  return (
    <div>
      <Icons.Send size={24} color="#009CDF" />
      <Icons.Edit size={20} disabled={false} />
      <Icons.Success size={16} />
    </div>
  );
}
```

## All Available Icons

- `SendIcon` - Send/Email icon
- `EditIcon` - Edit/Pencil icon  
- `TrashIcon` - Delete/Trash icon
- `SuccessIcon` - Success/Checkmark icon
- `FailureIcon` - Failure/X icon
- `PartialIcon` - Partial/Warning icon
- `SpinnerIcon` - Loading spinner icon
- `PlusIcon` - Plus/Add icon
- `PlusCircleIcon` - Plus with circle background
- `MinusCircleIcon` - Minus with circle background
- `ArrowDownIcon` - Arrow down (with open/close state)
- `PowerIcon` - Power/Switch icon
- `SwitchThumbIcon` - Switch thumb/circle
- `TargetIcon` - Target/Crosshair icon
- `PreviousIcon` - Previous/Arrow left icon
- `NextIcon` - Next/Arrow right icon
- `PauseIcon` - Pause icon
- `PlayIcon` - Play icon
- `FreezeIcon` - Freeze/Snowflake icon
- `AnonymizeIcon` - Anonymize/Eye icon

## Icon Props

All icons support these common props:

- `className?: string` - CSS class name
- `size?: number` - Icon size in pixels (default varies by icon)
- `color?: string` - Custom color (overrides default)
- `disabled?: boolean` - Disabled state (for applicable icons)

Some icons have additional props:

- `ArrowDownIcon`: `isOpen?: boolean`, `theme?: 'white' | 'blue'`
- `PowerIcon`: `isOff?: boolean`
- `SwitchThumbIcon`: `isOff?: boolean`  
- `AnonymizeIcon`: `isAnonymised?: boolean`

## Examples

```typescript
// Basic usage
<SendIcon />

// Custom size and color
<SendIcon size={32} color="#ff0000" />

// Disabled state
<SendIcon disabled={true} />

// Stateful icons
<ArrowDownIcon isOpen={true} theme="blue" />
<PowerIcon isOff={false} />
<AnonymizeIcon isAnonymised={true} />
```