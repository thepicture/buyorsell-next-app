import React from "react";

import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export interface ProductsFilterProps {
  categories: string[];
  onSortChange: (sort: string) => void;
  onCategoryChange: (category: string) => void;
}

export const ProductsFilter: React.FC<ProductsFilterProps> = ({
  categories,
  onCategoryChange,
  onSortChange,
}) => {
  return (
    <Card
      elevation={4}
      sx={{
        position: "sticky",
        top: "16px",
        marginTop: 2,
        marginRight: 2,
        padding: 2,
        height: "100vh",
      }}
    >
      {categories ? (
        <>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select-label"
              onChange={(event) =>
                onCategoryChange(event.target.value as string)
              }
              label="Category"
            >
              {[
                <MenuItem value="all">All</MenuItem>,
                ...categories.map((category) => (
                  <MenuItem value={category}>
                    {category[0].toUpperCase() + category.substring(1)}
                  </MenuItem>
                )),
              ]}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="sort-select-label">Sort</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select-label"
              onChange={(event) => onSortChange(event.target.value as any)}
              label="Sort"
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </>
      ) : (
        <Typography>Loading categories...</Typography>
      )}
    </Card>
  );
};
