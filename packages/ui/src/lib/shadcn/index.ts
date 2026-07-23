export * from './utils.ts';

import {
	AlertDialog,
	AlertDialogTitle,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogPortal,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTrigger,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogMedia,
} from './alert-dialog/index.ts';

const AlertDialogComponents = {
	Root: AlertDialog,
	Title: AlertDialogTitle,
	Action: AlertDialogAction,
	Cancel: AlertDialogCancel,
	Portal: AlertDialogPortal,
	Footer: AlertDialogFooter,
	Header: AlertDialogHeader,
	Trigger: AlertDialogTrigger,
	Overlay: AlertDialogOverlay,
	Content: AlertDialogContent,
	Description: AlertDialogDescription,
	Media: AlertDialogMedia,
};

export { AlertDialogComponents as AlertDialog };

/*  */

import {
	Avatar,
	AvatarImage,
	AvatarFallback,
	AvatarBadge,
	AvatarGroup,
	AvatarGroupCount,
} from './avatar/index.ts';

const AvatarComponents = {
	Root: Avatar,
	Image: AvatarImage,
	Fallback: AvatarFallback,
	Badge: AvatarBadge,
	Group: AvatarGroup,
	GroupCount: AvatarGroupCount,
};

export { AvatarComponents as Avatar };

/*  */

export { badgeVariants, Badge, type BadgeVariant } from './badge/index.ts';

/*  */

export {
	buttonVariants,
	Button,
	type ButtonProps,
	type ButtonSize,
	type ButtonVariant,
} from './button/index.ts';

/*  */

import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator } from './button-group/index.ts';

const ButtonGroupComponents = {
	Root: ButtonGroup,
	Text: ButtonGroupText,
	Separator: ButtonGroupSeparator,
};

export { ButtonGroupComponents as ButtonGroup };

/*  */

export { Checkbox } from './checkbox/index.ts';

/*  */

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible/index.ts';

const CollapsibleComponents = {
	Root: Collapsible,
	Content: CollapsibleContent,
	Trigger: CollapsibleTrigger,
};

export { CollapsibleComponents as Collapsible };

/*  */

import {
	Drawer,
	DrawerNestedRoot,
	DrawerContent,
	DrawerDescription,
	DrawerOverlay,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	DrawerPortal,
	DrawerClose,
} from './drawer/index.ts';

const DrawerComponents = {
	Root: Drawer,
	NestedRoot: DrawerNestedRoot,
	Content: DrawerContent,
	Description: DrawerDescription,
	Overlay: DrawerOverlay,
	Footer: DrawerFooter,
	Header: DrawerHeader,
	Title: DrawerTitle,
	Trigger: DrawerTrigger,
	Portal: DrawerPortal,
	Close: DrawerClose,
};

export { DrawerComponents as Drawer };

/*  */

import {
	DropdownMenu,
	DropdownMenuCheckboxGroup,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuPortal,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
	DropdownMenuGroupHeading,
} from './dropdown-menu/index.ts';

const DropdownMenuComponents = {
	Root: DropdownMenu,
	CheckboxGroup: DropdownMenuCheckboxGroup,
	CheckboxItem: DropdownMenuCheckboxItem,
	Content: DropdownMenuContent,
	Portal: DropdownMenuPortal,
	Group: DropdownMenuGroup,
	Item: DropdownMenuItem,
	Label: DropdownMenuLabel,
	RadioGroup: DropdownMenuRadioGroup,
	RadioItem: DropdownMenuRadioItem,
	Separator: DropdownMenuSeparator,
	Shortcut: DropdownMenuShortcut,
	Sub: DropdownMenuSub,
	SubContent: DropdownMenuSubContent,
	SubTrigger: DropdownMenuSubTrigger,
	Trigger: DropdownMenuTrigger,
	GroupHeading: DropdownMenuGroupHeading,
};

export { DropdownMenuComponents as DropdownMenu };

/*  */

import {
	Empty,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
	EmptyDescription,
	EmptyContent,
} from './empty/index.ts';

const EmptyComponents = {
	Root: Empty,
	Header: EmptyHeader,
	Media: EmptyMedia,
	Title: EmptyTitle,
	Description: EmptyDescription,
	Content: EmptyContent,
};

export { EmptyComponents as Empty };

/*  */

export { Input } from './input/index.ts';

/*  */

import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
} from './input-group/index.ts';

const InputGroupComponents = {
	Root: InputGroup,
	Addon: InputGroupAddon,
	Button: InputGroupButton,
	Input: InputGroupInput,
	Text: InputGroupText,
	Textarea: InputGroupTextarea,
};

export { InputGroupComponents as InputGroup };

/*  */

export { Progress } from './progress/index.ts';

/*  */

import { ScrollArea, ScrollAreaScrollbar } from './scroll-area/index.ts';

const ScrollAreaComponents = {
	Root: ScrollArea,
	Scrollbar: ScrollAreaScrollbar,
};

export { ScrollAreaComponents as ScrollArea };

/*  */

export { Separator } from './separator/index.ts';

/*  */

export { Skeleton } from './skeleton/index.ts';

/*  */

export { Spinner } from './spinner/index.ts';

/*  */

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs/index.ts';

const TabsComponents = {
	Root: Tabs,
	Content: TabsContent,
	List: TabsList,
	Trigger: TabsTrigger,
};

export { TabsComponents as Tabs };

/*  */

export { Textarea } from './textarea/index.ts';

/*  */

export {
	Toggle,
	toggleVariants,
	type ToggleSize,
	type ToggleVariant,
	type ToggleVariants,
} from './toggle/index.ts';

/*  */

import { ToggleGroup, ToggleGroupItem } from './toggle-group/index.ts';

const ToggleGroupComponents = {
	Root: ToggleGroup,
	Item: ToggleGroupItem,
};

export { ToggleGroupComponents as ToggleGroup };
