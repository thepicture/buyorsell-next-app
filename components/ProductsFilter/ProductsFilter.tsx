import React from "react";

import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

export interface ProductsFilterProps {
  categories: string[];
  onSortChange: (sort: string) => void;
  onCategoryChange: (category: string) => void;
  onSearchStringChange: (searchString: string) => void;
}

export const ProductsFilter: React.FC<ProductsFilterProps> = ({
  categories,
  onCategoryChange,
  onSortChange,
  onSearchStringChange,
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
      <Typography component="h2" variant="h5" mb={2}>
        Filters
      </Typography>
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
          <FormControl fullWidth>
            <TextField
              type="text"
              onChange={(event) => onSearchStringChange(event.target.value)}
              placeholder="Search..."
            />
          </FormControl>
        </>
      ) : (
        <Typography>Loading categories...</Typography>
      )}
    </Card>
  );
};
