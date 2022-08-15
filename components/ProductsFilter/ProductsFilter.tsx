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

import { theme } from "@styles";

export interface ProductsFilterProps {
  categories: string[];
  onSortChange: (sort: string) => void;
  onCategoryChange: (category: string) => void;
  category: string;
  onSearchStringChange: (searchString: string) => void;
}

export const ProductsFilter: React.FC<ProductsFilterProps> = ({
  categories,
  onCategoryChange,
  category,
  onSortChange,
  onSearchStringChange,
}) => {
  return (
    <Card
      elevation={4}
      sx={{
        position: "sticky",
        top: "80px",
        marginRight: 2,
        padding: 2,
        height: "100vh",
        zIndex: 1,
        [theme.breakpoints.down("md")]: {
          height: "auto",
          marginRight: 0,
        },
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
              value={category}
              onChange={(event) =>
                onCategoryChange(event.target.value as string)
              }
              label="Category"
            >
              {[
                <MenuItem key="all" value="all">
                  All
                </MenuItem>,
                ...categories.map((category) => (
                  <MenuItem key={category} value={category}>
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
              defaultValue="desc"
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
