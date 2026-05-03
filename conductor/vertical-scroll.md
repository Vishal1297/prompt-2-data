# Plan: Add Vertical Scroll to Output Preview

This plan details the changes required to add a vertical scrollbar to the output preview table when it contains a large number of entries.

## 1. Modify `src/components/output/OutputArea.jsx`

The `div` that wraps the `PreviewTable` component will be made scrollable.

**File:** `src/components/output/OutputArea.jsx`

**Change:** Add `overflow-y-auto` and `custom-scrollbar` classes to the `div` that contains the `PreviewTable` component.

**Before:**
```jsx
<div className="flex-1 flex flex-col relative">
  <PreviewTable data={generatedData} />
</div>
```

**After:**
```jsx
<div className="flex-1 flex flex-col relative overflow-y-auto custom-scrollbar">
  <PreviewTable data={generatedData} />
</div>
```

## 2. Modify `src/components/output/PreviewTable.jsx`

The `PreviewTable` component itself should no longer manage overflow. This responsibility is being moved to its parent.

**File:** `src/components/output/PreviewTable.jsx`

**Change:** Remove the `overflow-auto` and `custom-scrollbar` classes from the root `div` of the component.

**Before:**
```jsx
return (
  <div className="overflow-auto flex-1 custom-scrollbar">
    <table className="w-full text-sm text-left border-collapse">
    ...
    </table>
  </div>
);
```

**After:**
```jsx
return (
  <div className="">
    <table className="w-full text-sm text-left border-collapse">
    ...
    </table>
  </div>
);
```

By making these changes, the `OutputArea` will correctly manage the scrolling of the `PreviewTable`, and the table will properly display a vertical scrollbar when the data exceeds the available space.
