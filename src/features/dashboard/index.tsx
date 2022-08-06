import { ChatBubbleRounded, LinearScale, PeopleAlt } from "@mui/icons-material";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { StatisticItem } from "./components/StatisticItem";
import StudentRankingList from "./components/StudentRankingList";
import Widget from "./components/Widget";
import { dashboardActions, selectDashboardSlice } from "./dashboardSlice";

interface Props {}

export const Dashboard = (props: Props) => {
  const disaptch = useAppDispatch();
  const {
    loading,
    lowestStudentList,
    highestStudentList,
    rankingByCityList,
    statistics,
  } = useAppSelector(selectDashboardSlice);
  console.log(loading);
  useEffect(() => {
    disaptch(dashboardActions.fetchData());
  }, []);
  return (
    <Box sx={{ position: "relative", padding: "4px 0" }}>
      {/* Loading */}
      {loading && (
        <LinearProgress
          sx={{
            position: "absolute",
            top: "-8px",
            left: 0,
            right: 0,
          }}
        />
      )}
      {/* Statistic Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticItem
            icon={<ChatBubbleRounded fontSize="large" color="primary" />}
            label="mark >= 8"
            value={statistics.highMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticItem
            icon={<LinearScale fontSize="large" color="primary" />}
            label="mark <= 5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>

      {/* All Student Ranking */}
      <Box mt={4}>
        <Typography variant="h5">All Students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3} xl={3}>
              <Widget title="Student with highest mark">
                <StudentRankingList studentList={highestStudentList} />
              </Widget>
            </Grid>
            <Grid item xs={12} md={6} lg={3} xl={3}>
              <Widget title="Student with lowest mark">
                <StudentRankingList studentList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Ranking by city */}
      <Box mt={4}>
        <Typography variant="h5">Rankings by city</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid key={ranking.cityId} item xs={12} md={6} lg={3} xl={3}>
                <Widget title={ranking.cityName}>
                  <StudentRankingList studentList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
